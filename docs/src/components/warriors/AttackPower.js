import React from "react"

const AttackPower = ({ attack }) => {

    return (
        <div className="attack-per-second">
            <p>{`Attack Power:`}</p>
            <p>{attack}</p>
        </div>
    )
}

export default AttackPower