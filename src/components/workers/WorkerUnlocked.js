import React from "react"
import { RiBugLine } from "react-icons/ri"

const WorkerUnlocked = ({worker, handleUpgrade}) => {
    return (
        <li key={worker.id}>
            <button
                onClick={() => handleUpgrade(worker.id)}
                style={{cursor: 'pointer'}}
                className="worker-item worker-item-unlocked">
                    <div className="worker-unlocked">
                        <div className="worker-icon-level-container">
                            <p className="worker-icon-unlocked"><RiBugLine /></p>
                            <p>{`lvl: ${worker.level}`}</p>
                        </div>
                        <div className="worker-info-container">
                            <p className="worker-name">{`${worker.name}`}</p>
                            <p>{`HPS: ${worker.HPS}`}</p>
                            <p>{`Cost: ${worker.cost}`}</p>
                            <p>{`Multiplier: x${worker.multiplier}`}</p>
                        </div>
                    </div>
            </button>
        </li>
    )
}

export default WorkerUnlocked