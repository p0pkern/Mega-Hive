import React from "react"

const WorkerUnlocked = ({worker, handleUpgrade}) => {
    return (
        <li key={worker.id}>
            <button key={`${worker.id}btn`} onClick={() => handleUpgrade(worker.id)}>
                <p>{`Name: ${worker.name}`}</p>
                <p>{`Level: ${worker.level}`}</p>
                <p>{`HPS: ${worker.HPS}`}</p>
                <p>{`Cost: ${worker.cost}`}</p>
                <p>{`Multiplier: x${worker.multiplier}`}</p>
            </button>
        </li>
    )
}

export default WorkerUnlocked