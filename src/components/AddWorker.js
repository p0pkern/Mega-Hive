import React from "react"

const AddWorker = ({ text, addWorker }) => {
    return (
        <button onClick={addWorker}>{text}</button>
    )
}

export default AddWorker