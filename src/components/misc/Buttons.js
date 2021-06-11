import React from "react"

const Buttons = ({ text, handleClickEvent, classNameAssigned }) => {
    return (
        <button onClick={handleClickEvent} className={classNameAssigned}>{text}</button>
    )
}

export default Buttons