import React from "react"

const MealPerSecond = ({ mps }) => {

    return (
        <div>
            <p className="meal-per-second">{`Meal Per Second:`}</p>
            <p>{mps}</p>
        </div>
    )
}

export default MealPerSecond