import React, { useState, useEffect} from "react"

// Components
import Header from "./Header"
import Workers from "./Workers"
import Buttons from "./Buttons"
import WorkersPerSecond from "./WorkersPerSecond"

const GameContainer = () => {

    let newPlayerObject = {
        workers: 0,
        clickMultiplier: 1,
        buildings : [
            { name : "queen",
              cost : 30,
              multiplier : 1,
              level : 1,
            }
        ],
    }

    const [player, setPlayer] = useState(getInitialPlayer())

    const handleClick = () => {
        // Increments total workers by clicking.
        setPlayer({
            ...player,
            workers : player.workers + player.clickMultiplier
        })
    }

    const handleDelete = () => {
        localStorage.removeItem("player")
        resetPlayer()
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
    })

    return (
        <>
            <Header />
            <Workers workers={player.workers} />
            <WorkersPerSecond />
            <Buttons 
                text="Add Worker" 
                handleClickEvent={handleClick} 
            />
            <Buttons
                text="Delete Save" 
                handleClickEvent={handleDelete}
            />
        </>
    )

}

export default GameContainer