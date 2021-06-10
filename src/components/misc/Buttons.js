import React from "react"

const Buttons = ({ text, handleClickEvent }) => {
    return (
        <button onClick={handleClickEvent}>{text}</button>
    )
}

export default Buttons