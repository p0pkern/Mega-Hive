import React, { useState, useEffect } from "react"

// Components
import Buttons from "./misc/Buttons"
import Header from "./misc/Header"
import Footer from "./misc/Footer"
import CheatButton from "./misc/CheatButton"

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

// Ascension
import TrueMindHeader from "./true-mind/TrueMindHeading"
import TrueMind from "./true-mind/TrueMind"

const GameContainer = () => {

    ////////////////////
    // CHEAT SECTION //
    ///////////////////
    const handleEnableCheat = type => {
        if (type === "midGame") {
            setPlayer(prevPlayer => ({
                ...prevPlayer,
                meal : 100000000,
            }))
        } else {
            setPlayer(prevPlayer => ({
                ...prevPlayer,
                meat : 100000000,
            }))
        }
    }

    
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
                } 
            }
        }
        
        setPlayer(prevPlayer => ({
            ...prevPlayer,
            mealPerSecond: calculateMealPerSecond(), 
        }))
    }

    function unlockWorker(selectedUnit) {
        setPlayer({
            ...player,
            meal : player.meal - selectedUnit.cost, 
            workers : player.workers.map(prevWorker => {
                if (prevWorker.id === selectedUnit.id) {
                    prevWorker.unlocked = true
                    prevWorker.level = 1
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
            mealPerSecond: calculateMealPerSecond(),
        })
    }

    function calculateMealPerSecond() {
        const newMealPerSecond = player.workers.reduce((total, worker) => {
            if (worker.unlocked) {
                return total + worker.HPS
            } else {
                return total
            }
        }, 0)

        const totalMealPerSecond = newMealPerSecond + Math.ceil((newMealPerSecond * (player.mindEssence / 100)))

        return totalMealPerSecond
    }

    // Unlocking Warrior
    const handleInitialPurchaseWarrior = id => {
        for(let i=0; i < player.warriors.length; i++) {
            if (player.warriors[i].id === id) {
                const selectedWarrior = player.warriors[i]
                if (player.meat >= selectedWarrior.meatCost && player.meal >= selectedWarrior.harvestCost) {
                    unlockWarriorStats(selectedWarrior)
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
                    warrior.level = 1
                    warrior.meatCost = Math.round(warrior.baseMeatCost * (1.09**warrior.level))
                    warrior.harvestCost = Math.round(warrior.baseHarvestCost * (1.09**warrior.level))
                }
                return warrior
            }),
            attackPerSecond : newAttack,
        }))
    }

    // Upgrading warrior
    const upgradeWarrior = id => {
        for (let i=0; i < player.warriors.length; i++) {
            if (player.warriors[i].id === id) {
                const selectedWarrior = player.warriors[i]
                if (player.meat >= selectedWarrior.meatCost && player.meal >= selectedWarrior.harvestCost) {
                    upgradeWarriorStats(selectedWarrior)
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
            const meatCalc = (Math.round(.01 * player.enemy.health) > 1 ? Math.round(.01 * player.enemy.health) : 1)
            const meatStats = player.meat + Math.ceil(meatCalc * (player.mindEssence / 100))

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


    ///////////////////////////
    //ACTIVATE THE TRUE MIND//
    //////////////////////////

    const trueMindAscension = () => {
        const answer = window.confirm("Do you want to sacrifice you units and Ascend to the greater plane?")
        if (answer && (player.meal >= 100000 && player.meat > 1000)) {
            const essence = calculateMindEssence()
            const usableEssence = essence >= 100 ? player.mindEssence + Math.round(essence / 100) : player.mindEssence + 1

            const workerIds = ["w1", "w2", "w3", "w4", "w5",
                               "w6", "w7", "w8", "w9", "w10"]

            const warriorIds = ["wa1", "wa2", "wa3", "wa4", "wa5"]

            const randNum1 = getRandomInteger(player.workers.length - 1)
            const randNum2 = getRandomInteger(player.workers.length - 1)

            const randNum3 = getRandomInteger(player.warriors.length - 1)

            setPlayer(prevPlayer => ({
                ...prevPlayer,
                meat : 0,
                meal : 0,
                mealPerSecond: 0,
                workers : prevPlayer.workers.map(worker => {
                    worker.cost = worker.baseCost 
                    worker.HPS = worker.baseHPS
                    worker.level = 0
                    worker.unlocked = false
                    if (worker.id === workerIds[randNum1]) {
                        worker.multiplier = worker.multiplier + 1
                    }
                    if (worker.id === workerIds[randNum2]) {
                        worker.multiplier = worker.multiplier + 1
                    }

                    return worker
                }),
                attackPower : 1,
                attackPerSecond : 0,
                warriors : prevPlayer.warriors.map(warrior => {
                    warrior.level = 0
                    warrior.attack = warrior.baseAttack
                    warrior.meatCost = warrior.baseMeatCost
                    warrior.harvestCost = warrior.baseHarvestCost
                    warrior.unlocked = false
                    if (warrior.id === warriorIds[randNum3]) {
                        warrior.multiplier += 1
                    }
                    return warrior
                }),
                mindEssence : usableEssence
            }))
        } else if (answer && (player.meat < 1000 || player.meal < 100000)) {
            alert("The True Mind denies your request.")
        }
    }

    function calculateMindEssence() {
        const workerEssence = player.workers.reduce((total, worker) => {
            return total + worker.level
        }, 0)

        const warriorEssence = player.workers.reduce((total, warrior) => {
            return total + warrior.level
        }, 0)

        return workerEssence + warriorEssence
    }

    function getRandomInteger(max) {
        return Math.floor(Math.random() * max)
    }

    ////////////////////////////
    //END TRUE MIND ACTIVATION//
    ////////////////////////////

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
                meal : prevPlayer.meal + (prevPlayer.mealPerSecond),
                enemy : enemyStats,
                meat : meatStats,
            }))
        }, 1000);
        return () => clearInterval(interval);
    }, [player]);

    //////////////////////////
    // END INCREMENTAL TIMER//
    //////////////////////////


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
    
    return (
        <div className="game-area">
            <div className="header-container">
                <Header />
                <div className="top-row-button">
                    <CheatButton 
                        text="Advance to Mid Game" 
                        handleCheat={handleEnableCheat}
                        type="midGame"/>
                    <CheatButton 
                        text="Advance to Late Game" 
                        handleCheat={handleEnableCheat}
                        type="lateGame"/>
                    <Buttons
                        text="New Game" 
                        handleClickEvent={handleDelete}
                        classNameAssigned="new-game-button"
                    />
                </div>
        
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
                    <div className="true-mind-area">
                        <div style={{visibility : player.mindEssence > 0 ? 'visible' : 'hidden'}}>
                            <TrueMindHeader essences={player.mindEssence} />
                        </div>
                        <div style={{visibility : player.warriors[2].unlocked ? 'visible' : 'hidden'}}>
                        <TrueMind handleAscension={trueMindAscension}/>
                        </div>
                    </div>
                </div>

                <footer>
                    <Footer /> 
                </footer>         
        </div>
    )
}

export default GameContainer