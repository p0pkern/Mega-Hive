import React from "react"

const FoodMined = ({ workers }) => {
    const totalWorkers = `Food mined: ${workers}`
    
    return (
        <h3>{totalWorkers}</h3>
    )
}

export default FoodMined