import React, { useState, useEffect} from "react"

// Components
import Buttons from "./misc/Buttons"
import Header from "./misc/Header"

// Worker Components
import MealMined from "./workers/MealMined"
import MealPerSecond from "./workers/MealPerSecond"
import WorkerItem from "./workers/WorkerItem.js"

// Player object
import { newPlayer } from "./data/NewPlayer"

const GameContainer = () => {

    let newPlayerObject = newPlayer

    const [player, setPlayer] = useState(getInitialPlayer())

    // GAME PLAY SECTION

    // Initial Unlock of units

    const handleInitialPurchase = id => {
        // Handles the initial purchase of a worker from hidden to revealed.

        for (let i=0; i < player.workers.length; i++) {
            if (player.workers[i].id === id) {
                const selectedWorker = player.workers[i]
                if (player.meal >= selectedWorker.cost) {
                    unlockUnit(selectedWorker)
                } else {
                    console.log("Insufficient funds for unlock.")
                }
            }
        }
        
        setPlayer({
            ...player,
            mealPerSecond: player.workers.reduce((total, worker) => {
                console.log(worker.unlocked)
                if (worker.unlocked) {
                    console.log(total + worker.HPS, "me")
                    return total + worker.HPS
                } else {
                    return total
                }
            }, 0), 
        })
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
                } else {
                    console.log("insufficient funds for upgrade")
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
        console.log(player)
    }

    // Handles clicking events on screen for resources

    const handleClick = () => {
        // Increments total workers by clicking.
        setPlayer({
            ...player,
            meal : player.meal + player.clickMultiplier
        })
    }

    // END OF GAMEPLAY SECTION


    // SAVING AND DELETING DATA TO LOCAL STORAGE SECTION

    const handleDelete = () => {
        // Deletes the game save from local storage.
        const answer = window.confirm("Reset all save data?")
        console.log(answer)
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

    // END OF SAVE DELETE SECTION

    return (
        <>
            <div className="game-container">
                <Header />
                <Buttons
                    text="New Game" 
                    handleClickEvent={handleDelete}
                />
            </div>
                <div className="gameplay-section">
                    <div className="harvest-section">
                        <MealMined meal={player.meal} />
                        <MealPerSecond mps={player.mealPerSecond}/>
                        <Buttons 
                            text="Harvest Meal" 
                            handleClickEvent={handleClick} 
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