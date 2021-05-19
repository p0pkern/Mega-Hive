class NewAnt {
    constructor (_name, _baseCost, _resource) {
        this.name = _name
        this.baseCost = _baseCost
        this.cost = _baseCost
        this.baseResource = _resource
        this.resource = _resource
        this.amount = 1
    }

    updateCost () {
        this.cost = Math.round(((this.baseCost * (this.amount**1.15)) * 100) / 100)
    }

    updateResource () {
        this.resource = this.baseResource * this.amount;
    }

    purchaseAnt () {
        if (player.larva >= this.cost) {
            this.amount += 1;
            player.larva -= this.cost;
            this.updateCost()
            this.updateResource()
        }
    }
}

class StartPlayer {
    constructor() {
        this.larva = 0;
        this.harvest = 0;
        this.meat = 0;
        this.larvaPerClick = 1;
        this.larvaPerSecond = 0;
        this.harvestPerClick = 0;
        this.harvestPerSecont = 0;
        this.meatPerClick = 0;
        this.meatPerSecond = 0;
        this.ants = []
    }

    addAnts() {
        let queen = new NewAnt('queen', 25, 1)
        this.ants.push(queen)
    }

    adjustLarvaPerClick () {
        this.larvaPerClick = this.ants.reduce((total, item) => {return total + item.resource}, 0);
        console.log(this.larvaPerClick)
    }

}

