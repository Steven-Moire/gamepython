// background.js

function updateBackground(epoch) {
    let backgroundImage;
    switch (epoch) {
        case 2020:
            backgroundImage = "/static/images/modern_landscape.jpg";
            break;
        case -5000:
            backgroundImage = "/static/images/ancient_landscape.jpg";
            break;
        default:
            backgroundImage = "/static/images/default_landscape.jpg";
    }
    console.log(`Updating background with: ${backgroundImage}`);
    document.body.style.backgroundImage = `url('${backgroundImage}')`;
}

// Applique l'image de fond par défaut lors du chargement
document.addEventListener('DOMContentLoaded', function() {
    const savedState = loadGameState();
    
    if (savedState) {
        const goldElement = document.getElementById('gold');
        const energyElement = document.getElementById('energy');
        const goldPerSecondElement = document.getElementById('gold-per-second');
        const energyPerSecondElement = document.getElementById('energy-per-second');
        const currentEpochElement = document.getElementById('current-epoch');
        
        console.log("Gold Element:", goldElement);
        console.log("Energy Element:", energyElement);
        console.log("Gold Per Second Element:", goldPerSecondElement);
        console.log("Energy Per Second Element:", energyPerSecondElement);
        console.log("Current Epoch Element:", currentEpochElement);

        if (goldElement) goldElement.innerText = savedState.gold;
        if (energyElement) energyElement.innerText = savedState.energy;
        if (goldPerSecondElement) goldPerSecondElement.innerText = savedState.gold_per_second;
        if (energyPerSecondElement) energyPerSecondElement.innerText = savedState.energy_per_second;
        if (currentEpochElement) currentEpochElement.innerText = savedState.current_epoch;

        updateBackground(savedState.current_epoch);
    } else {
        updateBackground(2020);
    }
});

function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    return savedState ? JSON.parse(savedState) : null;
}
