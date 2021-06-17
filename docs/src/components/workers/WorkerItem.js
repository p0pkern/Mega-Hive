import React from "react"
import WorkerUnlocked from "./WorkerUnlocked"
import WorkerLocked from "./WorkerLocked"

const WorkerItem = ({workerStats, initialPurchase, upgradingUnit}) => {
    if (workerStats.unlocked) {
        return (
            <WorkerUnlocked 
                worker={workerStats}
                handleUpgrade={upgradingUnit}
                key={workerStats.id}/>
        )}
    return (
        <WorkerLocked 
            workerId={workerStats.id}
            workerCost={workerStats.cost}
            handleInitialPurchase={initialPurchase}
            key={workerStats.id}
            />
    )
}

export default WorkerItem