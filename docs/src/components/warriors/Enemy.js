import React from "react"
import { GiLongAntennaeBug } from "react-icons/gi"

const Enemy = ({name, health, level, kills, handleAttackClick}) => {
    return (
        <button className="enemy-data" onClick={handleAttackClick} style={{cursor: "pointer"}}>
            <h3>{name}</h3>
            <p>{`Level: ${level}`}</p> 
            <p>Health:</p>
            <p>{health}</p>
            <p>Kills:</p>
            <p>{kills}</p>
            <GiLongAntennaeBug className="enemy-image"/>
            <p className="enemy-data-bottom">Click to kill</p>
        </button>
    )
}

export default Enemy