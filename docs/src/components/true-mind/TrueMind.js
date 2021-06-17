import React from "react"
import { GiBrainTentacle } from "react-icons/gi"
const TrueMind = ({ handleAscension }) => {
    return <button onClick={() => handleAscension()} 
                   className="true-mind-data"
                   style={{cursor: "pointer"}}>
            <h3>The True Mind</h3>
                <p><GiBrainTentacle /></p>
            <div className="true-mind-cost">
                <p>Meal: 100000</p>
                <p>Meat: 1000</p>
            </div>
            <p className="true-mind-text">The True Mind peers into your soul. If you offer it the lives of your units and your resources, it will bless you with the essence of your units as well as a bonus to 2 Workers and 1 Warrior. This effect is not reversable.</p>
        </button>
}

export default TrueMind