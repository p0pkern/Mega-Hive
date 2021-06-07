import React from "react"

const AddWorker = ({ text, handleClickEvent }) => {
    return (
        <button onClick={handleClickEvent}>{text}</button>
    )
}

export default AddWorker