import React from "react"

const WorkerLocked = ({workerId, workerCost, handleInitialPurchase}) => {
    return  (
        <li key={workerId}>
            <button key={`${workerId}btn`} 
                    onClick={() => handleInitialPurchase(workerId)}
                    className="worker-item">
                <p>??????????</p>
                <p>{`Cost: ${workerCost}`}</p>
            </button>
        </li>
    )
}

export default WorkerLocked