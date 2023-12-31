from flask import Flask, request, render_template, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = 'oh-so-secret'

debug = DebugToolbarExtension(app)
boggle_game = Boggle()

@app.route('/')
def home():
    '''Shows board.'''

    board = boggle_game.make_board()
    session['board'] = board

    return render_template('index.html', board=board)

@app.route('/check-word')
def check_word():
    '''Check dictionary for word.'''

    word = request.args['word']
    board = session['board']
    response = boggle_game.check_valid_word(board, word)

    return jsonify({'result': response})