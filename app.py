from flask import Flask, render_template, request
from database_layer.saveToDatabase import SaveToDatabase

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        req_form_dict = dict(request.form)
        SaveToDatabase().fillRow(req_form_dict['board_id'][0],
                                 req_form_dict['title_id'][0],
                                 req_form_dict['title'][0])
    return render_template('boards.html')


@app.route("/details/<board>")
def board_details(board):
    title = board
    return render_template('board_details.html', title=title)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
