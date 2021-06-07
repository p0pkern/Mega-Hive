import React from "react"

const newPlayer = {
    workers: 0,
    clickMultiplier: 1,
    queen : {
        name : "Queen",
        cost : 30,
        DPS : 1,
        level : 1,
        unlocked : false,
        multiplier : 1,   
    },
    buildings : [
        {
            name : "Brood Chamber",
            cost : 100,
            DPS : 5,
            level : 0,
            unlocked : false,
            multiplier : 1,
        },
    ],
}

export { newPlayer }