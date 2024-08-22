// storage.js

// Sauvegarde l'état du jeu dans le localStorage
function saveGameState(data) {
    localStorage.setItem('gameState', JSON.stringify(data));
}

// Restaure l'état du jeu depuis le localStorage
function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    return savedState ? JSON.parse(savedState) : null;
}
