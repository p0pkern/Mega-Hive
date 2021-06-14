const newPlayer = {
    meal: 0,
    clickMultiplier: 1,
    mealPerSecond: 0, 
    workers : [
        {
            id : "w1",
            name : "Queen",
            cost : 25,
            HPS : 1,
            level : 1,
            unlocked : false,
            multiplier : 1,
            baseCost : 25,
            baseHPS : 1,   
        },
        {   
            id : "w2",
            name : "Brood Chamber",
            cost : 100,
            HPS : 3,
            level : 1,
            unlocked : false,
            multiplier : 1,
            baseCost : 100,
            baseHPS : 3, 
        },
        {   
            id : "w3",
            name : "Attentive Daughters",
            cost : 500,
            HPS : 7,
            level : 1,
            unlocked : false,
            multiplier : 1,
            baseCost : 500,
            baseHPS : 7, 
        },
        {   
            id : "w4",
            name : "Moldy Chambers",
            cost : 3000,
            HPS : 12,
            level : 1,
            unlocked : false,
            multiplier : 1,
            baseCost: 3000,
            baseHPS : 12, 
        },
        {   
            id : "w5",
            name : "Aphid Farm",
            cost : 10000,
            HPS : 40,
            level : 1,
            unlocked : false,
            multiplier : 1,
            baseCost: 10000,
            baseHPS : 40, 
        },
        {   
            id : "w6",
            name : "Local Insects",
            cost : 40000,
            HPS : 100,
            level : 1,
            unlocked : false,
            multiplier : 1,
            baseCost: 40000,
            baseHPS : 100, 
        },
        {   
            id : "w7",
            name : "Stray Garbage",
            cost : 200000,
            HPS : 400,
            level : 1,
            unlocked : false,
            multiplier : 1,
            baseCost: 200000,
            baseHPS : 400, 
        },
        {   
            id : "w8",
            name : "Farming for... Ants?",
            cost : 1600000,
            HPS : 6500,
            level : 1,
            unlocked : false,
            multiplier : 1,
            baseCost: 1600000,
            baseHPS : 6500, 
        },
        {   
            id : "w9",
            name : "Primitive Harvesting Techniques",
            cost : 120000000,
            HPS : 99000,
            level : 1,
            unlocked : false,
            multiplier : 1,
            baseCost: 120000000,
            baseHPS : 99000, 
        },
        {   
            id : "w10",
            name : "Human Farming Supplies",
            cost : 4000000000,
            HPS : 100000,
            level : 1,
            unlocked : false,
            multiplier : 1,
            baseCost: 4000000000,
            baseHPS : 100000, 
        },
    ],
    attackPower: 250000,
    meat : 0,
    enemy : {
        name : "Bill the Placeholder Bug",
        level : 1,
        health : 10000000,
        kills : 0,
        baseHealth : 1000000,
    }
}

export { newPlayer }