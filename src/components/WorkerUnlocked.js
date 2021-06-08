import React from "react"

const WorkerUnlocked = ({worker}) => {
    return (
        <button>
            <p>{`Name: ${worker.name}`}</p>
            <p>{`Level: ${worker.level}`}</p>
            <p>{`DPS: ${worker.DPS}`}</p>
            <p>{`Cost: ${worker.cost}`}</p>
            <p>{`Multiplier: x${worker.multiplier}`}</p>
        </button>
    )
}

export default WorkerUnlocked