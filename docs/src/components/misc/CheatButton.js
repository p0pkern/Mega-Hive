import React from "react"

const CheatButton = ({text, handleEnableCheat}) => {
    return (
        <button className="cheat-button" onClick={handleEnableCheat}>
            {text}
        </button>
    )
}

export default CheatButton