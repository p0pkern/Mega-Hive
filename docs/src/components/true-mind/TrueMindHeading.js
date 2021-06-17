import React from "react"

const TrueMindHeader = ({ essences }) => {
    return (
        <div className="true-mind-header">
            <h3>Essences:</h3>
            <p>{`${essences} providing ${essences * 10}% Meal and Meat per second.`}</p>
        </div>

    )
}

export default TrueMindHeader