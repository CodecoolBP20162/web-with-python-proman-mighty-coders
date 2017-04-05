from database_layer.handle_database import HandleDatabase
from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        req_form_dict = dict(request.form)
        HandleDatabase().board_fill_row(board_id=req_form_dict['board_id'][0],
                                        title_id=req_form_dict['title_id'][0],
                                        title=req_form_dict['title'][0])
    return render_template('boards.html')


@app.route("/details/<board>", methods=['GET', 'POST'])
def board_details(board):
    title = board
    if request.method == 'POST':

        print(request.form['card_id'])

        HandleDatabase().card_fill_row(card_id=request.form['card_id'],
                                       title=request.form['title'],
                                       parent_board=request.form['parent_board'],
                                       status=request.form['status'],
                                       order=request.form['order'])

    return render_template('board_details.html', title=title)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
