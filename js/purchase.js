class NewUnit {
    constructor(unitName, unitCost, owned, mult) {
        this.unitName = unitName;
        this.unitCost = unitCost;
        this.owned = owned;
        this.multiplyer = mult;
    }
}

// Unit variables
const queenUnits = [
    {unitName : 'queen', unitCost: 1, owned: false, mult : 1}
]
const harvesterUnits = [
    {unitName : 'worker', unitCost: 1, owned: false, mult : 1}
]
const warriorUnits = [
    {unitName : 'fighter', unitCost: 1, owned: false, mult : 1}
] 

// Add unit variables and proper costs to player profile

for (i = 0; i < queenUnits.length; i++) {
    player.queens.push(new NewUnit(queenUnits[i].unitName, queenUnits[i].unitCost, queenUnits[i].owned, queenUnits[i].mult));
    // player.harvesterUnits.push(new NewUnit(queenUnits[i].unitName, queenUnits[i].unitCost, queenUnits[i].owned, queenUnits[i].mult));
    // player.warriorUnits.push(new NewUnit(queenUnits[i].unitName, queenUnits[i].unitCost, queenUnits[i].owned, queenUnits[i].mult));
}


