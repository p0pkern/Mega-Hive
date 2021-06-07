import React, { useState, useEffect} from "react"

// Components
import Header from "./Header"
import Workers from "./Workers"
import AddWorker from "./AddWorker"

const GameContainer = () => {

    const [player, setPlayer] = useState({
        workers: 0,
        clickMultiplier: 1,
    })

    const handleClick = () => {
        // Increments
        setPlayer({
            ...player,
            workers : player.workers + player.clickMultiplier
        })
    }

    return (
        <>
            <Header />
            <Workers workers={player.workers} />
            <AddWorker 
                text="Add Worker" 
                handleClickEvent={handleClick} 
            />
        </>
    )

}

export default GameContainer