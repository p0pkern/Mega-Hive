import React from "react"

const MealMined = ({ meal }) => {
    return (
        <div>
            <h3 className="meal-mined">{`Meal Harvested:`}</h3>
            <p>{meal}</p>
        </div>
    )
}

export default MealMined