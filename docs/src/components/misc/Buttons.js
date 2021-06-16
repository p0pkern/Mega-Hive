import React from "react"

const Buttons = ({ text, handleClickEvent, classNameAssigned }) => {
    return (
        <button 
            onClick={handleClickEvent} 
            className={classNameAssigned}
            style={{cursor: 'pointer'}}>{text}</button>
    )
}

export default Buttons