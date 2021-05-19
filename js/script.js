
let player = new StartPlayer();
player.addAnts();

// Reloads the UI current stats
function updateStats() {
    updateLarva();
}

function updateLarva() {
    document.getElementById('main-larva').innerText =
    `Larva: ${player.larva}`;
}

// Clicking Functions
function generateResource(resource) {
    player[resource] += player[`${resource}PerClick`];
    updateStats();
}

function addItem(ant) {
    player.ants[0].purchaseAnt()
    player.adjustLarvaPerClick();
    console.log(player.ants)
    updateStats();
}

// Interval timer for all elements
setInterval(
    function () {
        player.larva += player.larvaPerSecond;
        updateStats();
    },
1000);


// Saving and Loading Game
function save() {
    localStorage.setItem("save", JSON.stringify(player));
}

function load() {
    if (localStorage.getItem("save") !== null) {
        let savegame = JSON.parse(localStorage.getItem("save"));

        // Data assigned to player object
        if (typeof savegame.larva !== "undefined") player.larva = savegame.larva;
        if (typeof savegame.harvest !== "undefined") player.harvest = savegame.harvest;
        if (typeof savegame.meat !== "undefined") player.meat = savegame.meat;
        if (typeof savegame.laverPerClick !== "undefined") player.larvaPerClick = savegame.laverPerClick;
        if (typeof savegame.larvaPerSecond !== "undefined") player.larvaPerSecond = savegame.larvaPerSecond;
    }
    updateStats();
}

function deleteSave() {
    localStorage.removeItem("save");
    player = new StartPlayer;
    updateStats();
}

// Load save upon load of DOM
document.addEventListener('DOMContentLoaded', load());
