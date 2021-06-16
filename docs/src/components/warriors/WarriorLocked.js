import React from "react"
import { BsQuestionSquare } from "react-icons/bs"

const WarriorLocked = ({warrior, handleInitialPurchase}) => {
    return (
        <button 
            onClick={() => handleInitialPurchase(warrior.id)}
            className="warrior-locked">
            <p className="warrior-locked-icon"><BsQuestionSquare /></p>
            <div className="warrior-locked-data">
                <p>{`Harvest Cost: ${warrior.harvestCost}`}</p>
                <p>{`Meat Cost: ${warrior.meatCost}`}</p>
            </div>
        </button>
    )
}

export default WarriorLocked