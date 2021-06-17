import React from "react"

const CheatButton = ({text, handleCheat, type}) => {
    return (
        <button className="cheat-button" onClick={() => handleCheat(type)} style={{cursor: "pointer"}}>
            {text}
        </button>
    )
}

export default CheatButton