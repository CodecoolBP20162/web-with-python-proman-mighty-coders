from flask import Flask, render_template, request, g
from database_layer.saveToDatabase import SaveToDatabase
from database_layer.models import *


app = Flask(__name__)


@app.before_request
def before_request():
    """Connect to the database before each request."""
    g.db = Database().db
    g.db.connect()

@app.after_request
def after_request(response):
    """Close the database connection after each request."""
    g.db.close()
    return response

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        req_form_dict = dict(request.form)
        db = SaveToDatabase()
        db.fillRow(req_form_dict['board_id'][0],
                                 req_form_dict['title_id'][0],
                                 req_form_dict['title'][0])
    return render_template('boards.html')



@app.route("/details/<board>")
def board_details(board):
    title = board
    return render_template('board_details.html', title=title)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
