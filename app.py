from database_layer.handle_database import HandleDatabase
from flask import Flask, render_template, request
import json

app = Flask(__name__)
handle_db = HandleDatabase()


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        req_form_dict = dict(request.form)
        handle_db.board_fill_row(board_id=req_form_dict['board_id'][0],
                                 title_id=req_form_dict['title_id'][0],
                                 title=req_form_dict['title'][0])
    return render_template('boards.html')


@app.route('/boards', methods=['GET'])
def return_all_boards():
    return json.dumps(handle_db.make_json_list_from_boards())


@app.route('/cards', methods=['POST'])
def return_all_cards():
    request_form_dict = dict(request.form)
    board_id = request_form_dict['boardId'][0]
    return json.dumps(handle_db.make_json_list_from_cards(board_id))


@app.route("/details/<board>", methods=['GET', 'POST'])
def board_details(board):
    title = board
    if request.method == 'POST':

        HandleDatabase().card_fill_row(card_id=request.form['card_id'],
                                       title=request.form['title'],
                                       parent_board=request.form['parent_board'],
                                       status=request.form['status'],
                                       order=request.form['order'])
    return render_template('board_details.html', title=title)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
