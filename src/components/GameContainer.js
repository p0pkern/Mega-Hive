import React, { useState, useEffect} from "react"

// Components
import Header from "./Header"
import MealMined from "./MealMined"
import Buttons from "./Buttons"
import MealPerSecond from "./MealPerSecond"
import WorkerItem from "./WorkerItem.js"

// Player object
import { newPlayer } from "./NewPlayer"

const GameContainer = () => {

    let newPlayerObject = newPlayer

    const [player, setPlayer] = useState(getInitialPlayer())

    const handleClick = () => {
        // Increments total workers by clicking.
        setPlayer({
            ...player,
            meal : player.meal + player.clickMultiplier
        })
    }

    const handleDelete = () => {
        const answer = window.confirm("Reset all save data?")
        if (answer) {
            localStorage.removeItem("player")
            resetPlayer()
        }
        
    }

    function resetPlayer() {
        setPlayer(newPlayerObject)
    }

    function getInitialPlayer() {
        const temp = localStorage.getItem("player")
        const savedPlayer = JSON.parse(temp)
        return savedPlayer || newPlayerObject
    }

    useEffect(() => {
        const temp = JSON.stringify(player)
        localStorage.setItem("player", temp)
    }, [player])

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
                        <MealPerSecond />
                        <Buttons 
                            text="Harvest Meal" 
                            handleClickEvent={handleClick} 
                        />
                    </div>

                    <ul className="worker-list">
                        {player.workers.map(worker => {
                            return <WorkerItem workerStats={worker}/>
                        })}
                    </ul>
                </div>
        </>
    )

}

export default GameContainer