from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('board_template.html')

@app.route("/board_details")
def board_details():
    return render_template('board_details.html')

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
