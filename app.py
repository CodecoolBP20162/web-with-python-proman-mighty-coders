from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def show_boards():
    return render_template('test.html')

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
