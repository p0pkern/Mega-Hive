import React from "react"

const Meat = ({ meat }) => {
    return (
        <div className="meat-harvest">
            <h3 >Meat Hunted: </h3>
            <p>{meat}</p>
        </div>
    )
}

export default Meat