import React from "react"
import { BsQuestionSquare } from "react-icons/bs"

const WorkerLocked = ({workerId, workerCost, handleInitialPurchase}) => {
    return  (
        <li key={workerId}>
            <button key={`${workerId}btn`} 
                    onClick={() => handleInitialPurchase(workerId)}
                    className="worker-item"
                    style={{cursor: 'pointer'}}>
                <div className="locked-container">
                    <p className="locked-icon"><BsQuestionSquare/></p>
                    <p className="locked-cost">{`Cost: ${workerCost}`}</p>
                </div>
            </button>
        </li>
    )
}

export default WorkerLocked