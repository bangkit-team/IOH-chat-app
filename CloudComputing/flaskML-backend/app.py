from flask import Flask, request
import tensorflow as tf
import numpy as np

app = Flask(__name__)

interpreter = tf.lite.Interpreter(model_path="model.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()


@app.route('/speech', methods=['GET'])
def speech():
    return "Flask server for /speech"


@app.route('/translate', methods=['GET'])
def translatetext():

    input_data = np.array([[20]], dtype=np.float32)

    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()

    predictions = interpreter.get_tensor(output_details[0]['index'])

    data = {
        'message': "Berhasil Translate",
        'data': str(predictions[0][0])
    }

    return data


if __name__ == "__main__":
    app.run(port=5000, debug=True)
