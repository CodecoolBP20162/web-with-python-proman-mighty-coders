from database_layer.handle_database import HandleDatabase
from flask import Flask, render_template, request
import json


app = Flask(__name__)
handle_db = HandleDatabase()


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        req_form_dict = dict(request.form)
        handle_db.fill_row(board_id=req_form_dict['board_id'][0],
                           title_id=req_form_dict['title_id'][0],
                           title=req_form_dict['title'][0])
        return json.dumps(handle_db.make_json_list_from_boards())
    return render_template('boards.html')


@app.route('/boards', methods=['GET'])
def return_all_boards():
    return json.dumps(handle_db.make_json_list_from_boards())


@app.route("/details/<board>")
def board_details(board):
    title = board
    return render_template('board_details.html', title=title)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
