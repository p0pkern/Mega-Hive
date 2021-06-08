const newPlayer = {
    meal: 0,
    clickMultiplier: 1, 
    workers : [
        {
            id : "w1",
            name : "Queen",
            cost : 30,
            DPS : 1,
            level : 1,
            unlocked : true,
            multiplier : 1,   
        },
        {   
            id : "w2",
            name : "Brood Chamber",
            cost : 100,
            DPS : 5,
            level : 0,
            unlocked : true,
            multiplier : 1,
        },
        {   
            id : "w3",
            name : "Attentive Daughters",
            cost : 500,
            DPS : 10,
            level : 0,
            unlocked : false,
            multiplier : 1,
        },
        {   
            id : "w4",
            name : "Attentive Daughters",
            cost : 500,
            DPS : 10,
            level : 0,
            unlocked : false,
            multiplier : 1,
        },
    ],
}

export { newPlayer }