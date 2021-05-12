
let player = new StartPlayer();

// Reloads the UI current stats
function updateStats() {
    updateResources()
}

function updateResources() {
    document.getElementById('main-stats').innerText =
    `Larva: ${player.larva} harvest: ${player.harvest} Meat: ${player.meat}`
}

// Clicking Functions
function generateResource(resource) {
    player[resource] += player[`${resource}PerClick`];
    updateStats()
}

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
    }
    updateStats()
}

function deleteSave() {
    localStorage.removeItem("save");
    player = new StartPlayer;
    updateStats();
}

document.addEventListener('DOMContentLoaded', load());