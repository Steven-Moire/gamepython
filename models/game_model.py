class IdleGame:
    def __init__(self):
        self.gold = 0
        self.energy = 0
        self.gold_per_second = 1
        self.energy_per_second = 1
        self.current_epoch = 2020
        self.epochs = [2020, -5000]
        self.upgraded = False
        self.epoch_unlocked = False
        self.purchased_upgrades = []  # Liste des améliorations achetées

    def accumulate_resources(self):
        self.gold += self.gold_per_second
        self.energy += self.energy_per_second

    def upgrade(self):
        if self.gold >= 100 and not self.upgraded:
            self.gold -= 100
            self.gold_per_second += 1
            self.energy_per_second += 1
            self.upgraded = True
            self.purchased_upgrades.append('resource_upgrade')
            return {
                'success': True,
                'upgraded': True,
                'purchased_upgrades': self.purchased_upgrades
            }
        return {'success': False}

    def unlock_epoch_upgrade(self):
        if self.gold >= 10 and not self.epoch_unlocked:
            self.gold -= 10
            self.epoch_unlocked = True
            self.purchased_upgrades.append('epoch_upgrade')
            return {'success': True, 'epoch_unlocked': self.epoch_unlocked, 'purchased_upgrades': self.purchased_upgrades}
        return {
            'success': False,
            'message': 'Not enough gold or upgrade already purchased'
        }

    def change_epoch(self):
        if self.epoch_unlocked:  # On garde la vérification de déblocage de l'époque
            if self.current_epoch == 2020:
                self.current_epoch = -5000
            else:
                self.current_epoch = 2020
            return {'success': True, 'current_epoch': self.current_epoch}
        return {
            'success': False,
            'message': 'Epoch not unlocked'
        }
