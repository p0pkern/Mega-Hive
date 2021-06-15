import React from "react"
import WarriorLocked from "./WarriorLocked"
import WarriorUnlocked from "./WarriorUnlocked"

const Warriors = ({ warriorStats, initialPurchase, upgradeUnit }) => {
    if (warriorStats.unlocked) {
        return (
            <li key={warriorStats.id}>
                <WarriorUnlocked
                    warrior={warriorStats} 
                    handleUpgradeUnit={upgradeUnit}/>
            </li>
        )
    } else {
        return (
            <li key={warriorStats.id}>
                <WarriorLocked
                    warrior={warriorStats} 
                    handleInitialPurchase={initialPurchase}/>
            </li>
        )
    }

}

export default Warriors