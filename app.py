from flask import Flask, render_template, jsonify

app = Flask(__name__)


class IdleGame:
    def __init__(self):
        self.gold = 0
        self.gold_per_second = 1
        self.upgraded = False

    def accumulate_gold(self):
        self.gold += self.gold_per_second

    def upgrade(self):
        if self.gold >= 10 and not self.upgraded:
            self.gold -= 10
            self.gold_per_second += 1
            self.upgraded = True
            return True
        return False


game = IdleGame()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_gold')
def get_gold():
    game.accumulate_gold()
    return jsonify(gold=game.gold, gps=game.gold_per_second)


@app.route('/upgrade')
def upgrade():
    success = game.upgrade()
    return jsonify(success=success, gold=game.gold, upgraded=game.upgraded)


if __name__ == "__main__":
    app.run(debug=True)
