import React from "react"

const WorkerLocked = ({workerId, workerCost}) => {
    return  (
        <button key={workerId}>
            <p>??????????</p>
            <p>{`Cost: ${workerCost}`}</p>
        </button>
    )
}

export default WorkerLocked