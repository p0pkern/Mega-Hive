let player = new StartPlayer

function updateStats() {
    document.getElementById('main-stats').innerText =
    `Larva: ${player.larva} harvest: ${player.harvest} Meat: ${player.meat}`
}

// Clicking Functions

function mineLarva() {
    player.larva += 1;
    updateStats()
}

function mineHarvest() {
    player.harvest += 1;
    updateStats()
}

function mineMeat() {
    player.meat += 1;
    updateStats()
}

