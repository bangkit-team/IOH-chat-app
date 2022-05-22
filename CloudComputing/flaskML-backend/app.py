from flask import Flask, request
import tensorflow as tf

app = Flask(__name__)
translate = tf.saved_model.load('saved_model')


@app.route('/speech', methods=['GET'])
def speech():
    return "Flask server for /speech"


@app.route('/translate', methods=['POST'])
def translatetext():
    input = request.json['message']
    input_text = tf.constant([input])
    result = translate.tf_translate(input_text)

    for i in result['text']:
        print(i.numpy().decode())

    return "berhasil"


if __name__ == "__main__":
    app.run(port=5000, debug=True)
