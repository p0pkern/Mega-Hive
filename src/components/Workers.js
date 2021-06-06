import React from "react"

const Workers = ({ workers }) => {
    const totalWorkers = `Total workers: ${workers}`
    
    return (
        <h3>{totalWorkers}</h3>
    )
}

export default Workers