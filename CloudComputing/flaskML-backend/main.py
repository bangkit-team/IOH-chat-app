from flask import Flask

app = Flask(__name__)


@app.route('/speech', methods=['GET'])
def speech():
    return "Flask server for /speech"


@app.route('/feedback', methods=['POST'])
def feedback():
    return "Flask server for /feedback"


if __name__ == "__main__":
    app.run(port=5000, debug=True)
