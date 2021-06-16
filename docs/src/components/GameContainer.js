import React, { useState, useEffect } from "react"

// Components
import Buttons from "./misc/Buttons"
import Header from "./misc/Header"
import Message from "./misc/Message"
import Footer from "./misc/Footer"

// Worker Components
import MealMined from "./workers/MealMined"
import MealPerSecond from "./workers/MealPerSecond"
import WorkerItem from "./workers/WorkerItem"

// Warrior Components
import Meat from "./warriors/Meat"
import AttackPower from "./warriors/AttackPower"
import Enemy from "./warriors/Enemy"
import Warriors from "./warriors/Warriors"

// Player object
import { newPlayer } from "./data/NewPlayer"

const GameContainer = () => {

    ////////////////////
    // CHEAT SECTION //
    ///////////////////

    
    //////////////////////
    // END CHEAT SECTION//
    /////////////////////


    ///////////////////////
    // GAME PLAY SECTION//
    //////////////////////

    // Blank player object
    let newPlayerObject = newPlayer

    // Gameplay hook
    const [player, setPlayer] = useState(getInitialPlayer())

    // Initial Unlock of Worker
    const handleInitialPurchaseWorker = id => {
        // Handles the initial purchase of a worker from hidden to revealed.
        for (let i=0; i < player.workers.length; i++) {
            if (player.workers[i].id === id) {
                const selectedWorker = player.workers[i]
                if (player.meal >= selectedWorker.cost) {
                    unlockWorker(selectedWorker)
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

    function unlockWorker(selectedUnit) {
        setPlayer({
            ...player,
            meal : player.meal - selectedUnit.cost, 
            workers : player.workers.map(prevWorker => {
                if (prevWorker.id === selectedUnit.id) {
                    prevWorker.unlocked = true
                    prevWorker.cost = Math.round(((prevWorker.cost) * (1.07**prevWorker.level)))
                }
                return prevWorker
            }),
        })
    }

    // Upgrading Worker
    const handleUpgradeWorker = id => {
        for (let i=0; i < player.workers.length; i++) {
            if (player.workers[i].id === id) {
                const selectedWorker = player.workers[i]
                if (player.meal >= selectedWorker.cost) {
                    upgradeWorkerStats(selectedWorker)
                    handleMessage("")
                } else {
                    handleMessage("Insufficient harvest for upgrade.")
                }
            }  
        }
    }

    function upgradeWorkerStats(selectedUnit) {
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

    // Unlocking Warrior
    const handleInitialPurchaseWarrior = id => {
        for(let i=0; i < player.warriors.length; i++) {
            if (player.warriors[i].id === id) {
                const selectedWarrior = player.warriors[i]
                if (player.meat >= selectedWarrior.meatCost && player.meal >= selectedWarrior.harvestCost) {
                    unlockWarriorStats(selectedWarrior)
                    handleMessage("")
                } else if (player.meat < selectedWarrior.meatCost && player.meal < selectedWarrior.harvestCost) {
                    handleMessage("Insufficient harvest and meat for purchase")
                } else if (player.meat < selectedWarrior.meatCost) {
                    handleMessage("Insufficient meat for purchase.")
                } else {
                    handleMessage("Insufficient harvest for purchase.")
                }
            } 
        }
    }

    function unlockWarriorStats(selectedWarrior) {
        const meatLeft = player.meat - selectedWarrior.meatCost
        const mealLeft = player.meal - selectedWarrior.harvestCost
        const newAttack = player.warriors.reduce((total, warrior) => {
            if (warrior.unlocked) {
                return total + warrior.attack
            } else if (warrior.id === selectedWarrior.id){
                return total + warrior.attack
            } else {
                return total
            }
        }, 0)
        setPlayer(prevPlayer => ({
            ...prevPlayer,
            meal : mealLeft,
            meat : meatLeft,
            warriors : prevPlayer.warriors.map(warrior => {
                if (warrior.id === selectedWarrior.id) {
                    warrior.unlocked = true
                    warrior.meatCost = Math.round(warrior.baseMeatCost * (1.09**warrior.level))
                    warrior.harvestCost = Math.round(warrior.baseHarvestCost * (1.09**warrior.level))
                }
                return warrior
            }),
            attackPerSecond : newAttack,
        }))

    console.log(player)
    }

    // Upgrading warrior
    const upgradeWarrior = id => {
        for (let i=0; i < player.warriors.length; i++) {
            if (player.warriors[i].id === id) {
                const selectedWarrior = player.warriors[i]
                if (player.meat >= selectedWarrior.meatCost && player.meal >= selectedWarrior.harvestCost) {
                    upgradeWarriorStats(selectedWarrior)
                    handleMessage("")
                }
            }
        }
        
    }

    function upgradeWarriorStats(selectedWarrior) {
        const meatLeft = player.meat - selectedWarrior.meatCost
        const mealLeft = player.meal - selectedWarrior.harvestCost
        setPlayer(prevPlayer => ({
            ...prevPlayer,
            meal : mealLeft,
            meat : meatLeft,
            warriors : prevPlayer.warriors.map(warrior => {
                if (warrior.id === selectedWarrior.id) {
                    warrior.meatCost = Math.round(warrior.baseMeatCost * (1.09**warrior.level))
                    warrior.harvestCost = Math.round(warrior.baseHarvestCost * (1.09**warrior.level))
                    warrior.level = warrior.level + 1
                    warrior.attack = warrior.attack > 1 ? warrior.attack + (warrior.baseAttack * warrior.multiplier) : warrior.attack + 1
                }
                return warrior
            }),
            attackPerSecond : prevPlayer.warriors.reduce((total, warrior) => {
                if (warrior.unlocked) {
                    return total + warrior.attack
                } else {
                    return total
                }
            }, 0)
        }))
    } 

    // Handles clicking events on screen for resources
    const handleClick = () => {
        setPlayer(prevPlayer => ({
            ...prevPlayer,
            meal : prevPlayer.meal + prevPlayer.clickMultiplier
        }))
    }

    const handleAttack = () => {
        const { enemyStats, meatStats } = enemyDamageCalculator("attackPower")
        setPlayer(prevPlayer => ({
            ...prevPlayer,
            enemy : enemyStats,
            meat : meatStats,
        }))

    }

    // Calculate damage to the insect enemy
    function enemyDamageCalculator(type) {
        if (player.enemy.health - player[type] <= 0) {
            const enemyStats = { 
                    ...player.enemy,
                    level : player.enemy.level + 1,
                    health: Math.round((player.enemy.baseHealth * (1.2**player.enemy.level))),
                    kills : player.enemy.kills + 1,}
            const meatStats = player.meat + (Math.round(.01 * player.enemy.health) > 1 ? Math.round(.01 * player.enemy.health) : 1)

            return {enemyStats, meatStats}
        } else {
            const enemyStats = {
                    ...player.enemy,
                    health: player.enemy.health - player[type]
                }
            const meatStats = player.meat
            
            return {enemyStats, meatStats}
        }
    }

    ////////////////////////////
    // END OF GAMEPLAY SECTION//
    ///////////////////////////


    //////////////////////
    // INCREMENTAL TIMER//
    /////////////////////
    useEffect(() => {
        const { enemyStats, meatStats } = enemyDamageCalculator("attackPerSecond")
        const interval = setInterval(() => {
            setPlayer(prevPlayer => ({
                ...prevPlayer, 
                meal : prevPlayer.meal + prevPlayer.mealPerSecond,
                enemy : enemyStats,
                meat : meatStats,
            }))
        }, 1000);
        return () => clearInterval(interval);
    }, [player]);

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
    const [message, setMessage] = useState("Click on Harvest Meal to begin. For demo purposes, please use the 'Advance to x game buttons' ")

    const handleMessage = ( message ) => {
        setMessage(message)
    }
    ////////////////////////////
    // END OF MESSAGE SECTION //
    ///////////////////////////
    
    return (
        <div className="game-area">
            <div className="header-container">
                <Header />
                <Message sendMessage={message}/>
                <Buttons
                    text="New Game" 
                    handleClickEvent={handleDelete}
                    classNameAssigned="new-game-btn"
                />
        
            </div>
                <div className="gameplay-row">
                <div className="gameplay-section">
                    <div className="harvest-section">
                        <MealMined meal={player.meal} />
                        <MealPerSecond mps={player.mealPerSecond}/>
                        <Buttons 
                            text="Click to Harvest Meal" 
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
                                            initialPurchase={handleInitialPurchaseWorker}
                                            upgradingUnit={handleUpgradeWorker}/>
                            })}
                        </ul>
                    </div> 
                </div>
                    <div className="warriors-section" style={{visibility : player.workers[5].unlocked ? 'visible' : 'hidden'}}>
                        <Meat 
                            meat={player.meat}
                        />
                        <AttackPower attack={player.attackPerSecond}/>
                        <Enemy
                            handleAttackClick={handleAttack} 
                            name={player.enemy.name}
                            health={player.enemy.health}
                            level={player.enemy.level}
                            kills={player.enemy.kills}
                        />
                        <h3>Warriors</h3>
                        <ul className="warrior-list">
                            {player.warriors.map(warrior => {
                                return <Warriors 
                                            warriorStats={warrior}
                                            initialPurchase={handleInitialPurchaseWarrior}
                                            upgradeUnit={upgradeWarrior}/>
                            })}
                        </ul>

                    </div>
                </div>

                <footer>
                    <Footer /> 
                </footer>         
        </div>
    )
}

export default GameContainer