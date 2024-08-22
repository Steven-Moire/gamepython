// Fonction pour mettre à jour l'état du jeu
function updateGameState() {
    fetch('/get_resources')
        .then(response => response.json())
        .then(data => {
            console.log("Game Data:", data);

            // Sauvegarde l'état du jeu
            saveGameState(data);

            // Met à jour l'affichage
            const goldElement = document.getElementById('gold');
            const energyElement = document.getElementById('energy');
            const currentEpochElement = document.getElementById('current-epoch');
            const goldRateElement = document.getElementById('gold-rate');
            const energyRateElement = document.getElementById('energy-rate');

            if (goldElement) goldElement.innerText = data.gold;
            if (energyElement) energyElement.innerText = data.energy;
            if (currentEpochElement) currentEpochElement.innerText = data.current_epoch;

            // Mise à jour des taux avec les couleurs appropriées
            if (goldRateElement) {
                goldRateElement.innerText = `${data.gold_per_second}/s`;
                goldRateElement.className = data.gold_per_second >= 0 ? 'green' : 'red';
            }
            if (energyRateElement) {
                energyRateElement.innerText = `${data.energy_per_second}/s`;
                energyRateElement.className = data.energy_per_second >= 0 ? 'green' : 'red';
            }

            // Met à jour la liste des améliorations achetées
            updateUpgradeList(data.purchased_upgrades);

            // Affiche ou cache le bouton de changement d'époque
            const epochChangeSection = document.getElementById('epoch-change-section');
            epochChangeSection.style.display = data.epoch_unlocked ? 'block' : 'none';

            // Affiche ou cache l'upgrade de 10 or
            const upgrade10GoldContainer = document.getElementById('upgrade-10-gold');
            upgrade10GoldContainer.style.display = data.epoch_unlocked ? 'none' : 'block';

            // Met à jour le fond d'écran si l'époque a changé
            const backgroundUrl = getBackgroundUrl(data.current_epoch);
            updateBackground(backgroundUrl);
        })
        .catch(error => console.error('Error fetching game data:', error));
}

// Fonction pour mettre à jour la liste des améliorations achetées
function updateUpgradeList(upgrades) {
    const upgradeList = document.getElementById('upgrade-list');
    upgradeList.innerHTML = ''; // Réinitialise la liste

    if (upgrades.includes('epoch_upgrade')) {
        const epochUpgradeItem = document.createElement('li');
        epochUpgradeItem.textContent = 'Déblocage du changement d\'époque';
        upgradeList.appendChild(epochUpgradeItem);
    }

    if (upgrades.includes('resource_upgrade')) {
        const resourceUpgradeItem = document.createElement('li');
        resourceUpgradeItem.textContent = 'Augmentation des ressources par seconde';
        upgradeList.appendChild(resourceUpgradeItem);
    }
}

// Fonction pour obtenir l'URL du fond d'écran en fonction de l'époque
function getBackgroundUrl(epoch) {
    const backgrounds = {
        2020: 'path/to/background2020.jpg',
        -5000: 'path/to/background5000.jpg'
    };
    return backgrounds[epoch] || 'path/to/default-background.jpg';
}

// Fonction pour mettre à jour le fond d'écran
function updateBackground(backgroundUrl) {
    document.body.style.backgroundImage = `url(${backgroundUrl})`;
}

// Assure-toi que les événements des boutons sont correctement définis
document.addEventListener('DOMContentLoaded', function() {
    setInterval(updateGameState, 1000);

    document.getElementById('upgrade-100-btn').addEventListener('click', function() {
        fetch('/upgrade')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Amélioration achetée !');
                    updateUpgradeList(data.purchased_upgrades);
                } else {
                    alert('Vous n\'avez pas assez d\'or pour acheter l\'amélioration.');
                }

                // Sauvegarde l'état du jeu
                saveGameState(data);

                const goldElement = document.getElementById('gold');
                const energyElement = document.getElementById('energy');

                if (goldElement) goldElement.innerText = data.gold;
                if (energyElement) energyElement.innerText = data.energy;
            })
            .catch(error => console.error('Error upgrading:', error));
    });

    document.getElementById('upgrade-10-btn').addEventListener('click', function() {
        fetch('/unlock_epoch_upgrade')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Upgrade de changement d\'époque débloqué !');
                    updateGameState();
                } else {
                    alert(data.message || 'Erreur lors du déblocage de l\'upgrade.');
                }
            })
            .catch(error => console.error('Error unlocking epoch upgrade:', error));
    });

    document.getElementById('change-epoch-btn').addEventListener('click', function() {
        fetch('/change_epoch')
            .then(response => response.json())
            .then(data => {
                const currentEpochElement = document.getElementById('current-epoch');

                if (currentEpochElement) {
                    currentEpochElement.innerText = data.current_epoch;
                }

                // Sauvegarde l'état du jeu
                saveGameState(data);

                // Met à jour le fond d'écran
                const backgroundUrl = getBackgroundUrl(data.current_epoch);
                updateBackground(backgroundUrl);
            })
            .catch(error => console.error('Error changing epoch:', error));
    });
});
