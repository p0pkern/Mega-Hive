import React from "react"
import WorkerUnlocked from "./WorkerUnlocked"
import WorkerLocked from "./WorkerLocked"

const WorkerItem = ({workerStats, initialPurchase, upgradingUnit}) => {
    if (workerStats.unlocked) {
        return (
            <WorkerUnlocked 
                worker={workerStats}
                handleUpgrade={upgradingUnit}/>
        )}
    return (
        <WorkerLocked 
            workerId={workerStats.id}
            workerCost={workerStats.cost}
            handleInitialPurchase={initialPurchase}
            />
    )
}

export default WorkerItem