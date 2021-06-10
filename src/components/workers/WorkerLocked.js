import React from "react"

const WorkerLocked = ({workerId, workerCost, handleInitialPurchase}) => {
    return  (
        <li key={workerId}>
            <button key={`${workerId}btn`} onClick={() => handleInitialPurchase(workerId)}>
                <p>??????????</p>
                <p>{`Cost: ${workerCost}`}</p>
            </button>
        </li>
    )
}

export default WorkerLocked