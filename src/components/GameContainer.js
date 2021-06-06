import React, { useState, useEffect} from "react"

// Components
import Header from "./Header"
import Workers from "./Workers"
import AddWorker from "./AddWorker"

const GameContainer = () => {

    const [player, setPlayer] = useState({
        workers: 0,
    })

    const handleClick = () => {
        console.log("click")
        // setPlayer({
        //     ...player,
        //     workers : player.workers + 1
        // })
    }

    return (
        <>
            <Header />
            <Workers workers={player.workers} />
            <AddWorker text="Add Worker" onClick={handleClick()}/>
        </>
    )

}

export default GameContainer