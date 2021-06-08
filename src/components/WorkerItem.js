import React from "react"
import WorkerUnlocked from "./WorkerUnlocked"
import WorkerLocked from "./WorkerLocked"

const WorkerItem = ({workerStats}) => {
    if (workerStats.unlocked) {
        return (
            <li key={workerStats.id}><WorkerUnlocked worker={workerStats}/></li>
        )}
    return (
        <li key={workerStats.id}>
            <WorkerLocked 
                workerId={workerStats.id}
                workerCost={workerStats.cost}/>
        </li>
    )
}

export default WorkerItem