class NewUnit {
    constructor(props) {
        this.unitName = unitName;
        this.owned = owned;
        this.baseCost = baseCost;
        this.baseMult = baseMult;
        this.unitCost = baseCost * (1.07^this.owned);
        this.mult = baseMult * (1.01^this.owned);
    }
}

