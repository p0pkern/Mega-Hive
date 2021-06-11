import React, { useState, useEffect} from "react"

// Components
import Buttons from "./misc/Buttons"
import Header from "./misc/Header"
import Message from "./misc/Message"

// Worker Components
import MealMined from "./workers/MealMined"
import MealPerSecond from "./workers/MealPerSecond"
import WorkerItem from "./workers/WorkerItem.js"

// Player object
import { newPlayer } from "./data/NewPlayer"

const GameContainer = () => {

    ///////////////////////
    // GAME PLAY SECTION//
    //////////////////////

    // Blank player object
    let newPlayerObject = newPlayer

    // Gameplay hook
    const [player, setPlayer] = useState(getInitialPlayer())

    // Initial Unlock of units
    const handleInitialPurchase = id => {
        // Handles the initial purchase of a worker from hidden to revealed.
        for (let i=0; i < player.workers.length; i++) {
            if (player.workers[i].id === id) {
                const selectedWorker = player.workers[i]
                if (player.meal >= selectedWorker.cost) {
                    unlockUnit(selectedWorker)
                    handleMessage("")
                } else {
                    handleMessage("Insufficient harvest for unlock.")
                }
            }
        }
        
        setPlayer(prevPlayer => ({
            ...prevPlayer,
            mealPerSecond: prevPlayer.workers.reduce((total, worker) => {
                if (worker.unlocked) {
                    return total + worker.HPS
                } else {
                    return total
                }
            }, 0), 
        }))
    }

    function unlockUnit(selectedUnit) {
        setPlayer({
            ...player,
            meal : player.meal - selectedUnit.cost, 
            workers : player.workers.map(prevWorker => {
                if (prevWorker.id === selectedUnit.id) {
                    prevWorker.unlocked = true
                    prevWorker.cost = Math.round(((prevWorker.cost * prevWorker.multiplier) * (1.07**prevWorker.level)))
                }
                return prevWorker
            }),
        })
    }

    // Upgrading units
    const handleUpgrade = id => {
        for (let i=0; i < player.workers.length; i++) {
            if (player.workers[i].id === id) {
                const selectedWorker = player.workers[i]
                if (player.meal >= selectedWorker.cost) {
                    upgradeUnit(selectedWorker)
                    handleMessage("")
                } else {
                    handleMessage("Insufficient harvest for upgrade.")
                }
            }  
        }
    }

    function upgradeUnit(selectedUnit) {
        setPlayer({
            ...player,
            meal : player.meal - selectedUnit.cost,
            workers : player.workers.map(prevWorker => {
                if (prevWorker.id === selectedUnit.id) {
                    prevWorker.cost = Math.round((prevWorker.cost * (1.07**prevWorker.level)))
                    prevWorker.level = prevWorker.level + 1
                    prevWorker.HPS = prevWorker.HPS > 1 ? prevWorker.HPS + (prevWorker.baseHPS * prevWorker.multiplier) : prevWorker.HPS + 1
                }
                return prevWorker
            }),
            mealPerSecond: player.workers.reduce((total, worker) => {
                if (worker.unlocked) {
                    return total + worker.HPS
                } else {
                    return total
                }
            }, 0), 
        })
    }

    // Handles clicking events on screen for resources
    const handleClick = () => {
        setPlayer({
            ...player,
            meal : player.meal + player.clickMultiplier
        })
    }

    ////////////////////////////
    // END OF GAMEPLAY SECTION//
    ///////////////////////////


    //////////////////////
    // INCREMENTAL TIMER//
    /////////////////////
    useEffect(() => {
        const interval = setInterval(() => {
            setPlayer(prevPlayer => ({
                ...prevPlayer, meal : prevPlayer.meal + prevPlayer.mealPerSecond
            }))
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    //////////////////////////
    // END INCREMENTAL TIMER//
    /////////////////////////


    //////////////////////////////////////////////////////
    // SAVING AND DELETING DATA TO LOCAL STORAGE SECTION//
    /////////////////////////////////////////////////////
    const handleDelete = () => {
        // Deletes the game save from local storage.
        const answer = window.confirm("Reset all save data?")
        if (answer) {
            localStorage.removeItem("player")
            resetPlayer()
        }   
    }

    function resetPlayer() {
        setPlayer(newPlayerObject)
        window.location.reload()
    }

    function getInitialPlayer() {
        // Parses local storage for player data before assigning a new game.
        const temp = localStorage.getItem("player")
        const savedPlayer = JSON.parse(temp)
        return savedPlayer || newPlayerObject
    } 

    useEffect(() => {
        // Sets data to local storage any time player object changes.
        const temp = JSON.stringify(player)
        localStorage.setItem("player", temp)
    }, [player])
    ////////////////////////////////
    // END OF SAVE DELETE SECTION//
    ///////////////////////////////

    ///////////////////////
    // MESSAGE SECTION ///
    //////////////////////
    const [message, setMessage] = useState("")

    const handleMessage = ( message ) => {
        setMessage(message)
    }
    ////////////////////////////
    // END OF MESSAGE SECTION //
    ///////////////////////////
    
    return (
        <>
            <div className="header-container">
                <Header />
                <Buttons
                    text="New Game" 
                    handleClickEvent={handleDelete}
                    classNameAssigned="new-game-btn"
                />
                <Message sendMessage={message}/>
            </div>
                <div className="gameplay-section">
                    <div className="harvest-section">
                        <MealMined meal={player.meal} />
                        <MealPerSecond mps={player.mealPerSecond}/>
                        <Buttons 
                            text="Harvest Meal" 
                            handleClickEvent={handleClick}
                            classNameAssigned="harvest-meal-btn" 
                        />
                    </div>
                    <div className="workers-section">
                        <h3>Workers</h3>
                        <ul className="worker-list">
                            {player.workers.map(worker => {
                                return <WorkerItem 
                                            workerStats={worker} 
                                            initialPurchase={handleInitialPurchase}
                                            upgradingUnit={handleUpgrade}
                                        />
                            })}
                        </ul>
                    </div>
                </div>
        </>
    )

}

export default GameContainer