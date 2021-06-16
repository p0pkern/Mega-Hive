import React from "react"
import { GiAlienBug } from "react-icons/gi"

const WarriorUnlocked = ({ warrior, handleUpgradeUnit}) => {
    return (
        <button 
            onClick={() => handleUpgradeUnit(warrior.id)}
            className="warrior-unlocked">
            <div className="warrior-unlocked-data">
                <div className="warrior-unlocked-name-level">
                    <p>{warrior.name}</p>
                    <p className="warrior-unlocked-icon"><GiAlienBug /></p>
                    <p>{`Level: ${warrior.level}`}</p>
                </div>
                <div className="warrior-unlocked-data-items">
                    <p>{`Atk: ${warrior.attack}`}</p>
                    <p>{`Meat: ${warrior.meatCost}`}</p>
                    <p>{`Meal: ${warrior.harvestCost}`}</p>
                </div>
            </div>
        </button>
    )
}

export default WarriorUnlocked