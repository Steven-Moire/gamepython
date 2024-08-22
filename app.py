from flask import Flask
from controllers.game_controller import bp as game_bp
from models.game_model import IdleGame

# Création de l'instance du modèle
game_instance = IdleGame()


def create_app():
    app = Flask(__name__)

    # Enregistrement des blueprints
    app.register_blueprint(game_bp)

    # Ajouter l'instance du modèle à l'application Flask
    app.config['GAME_INSTANCE'] = game_instance

    return app


# Création de l'application
app = create_app()


if __name__ == "__main__":
    app.run(debug=True)
