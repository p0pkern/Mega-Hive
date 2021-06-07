import React, { useState, useEffect} from "react"

// Components
import Header from "./Header"
import Workers from "./Workers"
import AddWorker from "./AddWorker"
import DeleteSave from "./DeleteSave"

const GameContainer = () => {

    let newPlayerObject = {
        workers: 0,
        clickMultiplier: 1,
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
        console.log(localStorage)
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
            <AddWorker 
                text="Add Worker" 
                handleClickEvent={handleClick} 
            />
            <DeleteSave handleDeleteEvent={handleDelete}/>
        </>
    )

}

export default GameContainer