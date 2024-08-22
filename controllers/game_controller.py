from flask import Blueprint, render_template, jsonify, request, current_app

bp = Blueprint('game', __name__)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/about')
def about():
    return render_template('about.html')

@bp.route('/get_resources')
def get_resources():
    game = current_app.config['GAME_INSTANCE']
    game.accumulate_resources()
    return jsonify(
        gold=game.gold,
        energy=game.energy,
        gold_per_second=game.gold_per_second,
        energy_per_second=game.energy_per_second,
        current_epoch=game.current_epoch,
        epoch_unlocked=game.epoch_unlocked,
        upgrades=[
            {"id": 1, "name": "Changer d'époque", "description": "Débloque le changement d'époque."} if game.epoch_unlocked else {},
            {"id": 2, "name": "Augmenter les ressources", "description": "Augmente les ressources par seconde."}
        ]
    )

@bp.route('/upgrade')
def upgrade():
    game = current_app.config['GAME_INSTANCE']
    result = game.upgrade()
    return jsonify(
        success=result['success'],
        gold=game.gold,
        energy=game.energy,
        upgrades=[
            {"id": 2, "name": "Augmenter les ressources", "description": "Augmente les ressources par seconde."}
        ],
        upgraded=result['upgraded']
    )

@bp.route('/unlock_epoch_upgrade')
def unlock_epoch_upgrade():
    game = current_app.config['GAME_INSTANCE']
    result = game.unlock_epoch_upgrade()
    return jsonify(
        success=result['success'],
        epoch_unlocked=result['epoch_unlocked'],
        message=result.get('message', '')
    )

@bp.route('/change_epoch')
def change_epoch():
    game = current_app.config['GAME_INSTANCE']
    result = game.change_epoch()
    return jsonify(
        success=result['success'],
        current_epoch=game.current_epoch,
        message=result.get('message', '')
    )
