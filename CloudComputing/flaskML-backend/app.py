from flask import Flask, request
import tensorflow as tf
import numpy as np

app = Flask(__name__)

# interpreter = tf.lite.Interpreter(model_path="model.tflite")
# interpreter.allocate_tensors()
# input_details = interpreter.get_input_details()
# output_details = interpreter.get_output_details()

model = tf.keras.models.load_model("saved_model")
model.summary()


@app.route('/', methods=['GET'])
def home():
    return "success"


@app.route('/nonchat', methods=['POST'])
def nonchat():
    image = request.form['image']
    print(image)
    img = tf.keras.preprocessing.image.load_img(image, target_size=(224, 224))
    x = tf.keras.preprocessing.image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    images = np.vstack([x])

    # lebih dari 0.5 = non chat
    # kurang dari 0.5 = chat
    # output string
    hasil = model.predict(images)
    hasil = str(hasil[0][0])
    print(hasil)
    return "success"


@app.route('/speech', methods=['GET'])
def speech():
    return "Flask server for /speech"


# @app.route('/translate', methods=['GET'])
# def translatetext():

#     input_data = np.array([[20]], dtype=np.float32)

#     interpreter.set_tensor(input_details[0]['index'], input_data)
#     interpreter.invoke()

#     predictions = interpreter.get_tensor(output_details[0]['index'])

#     data = {
#         'message': "Berhasil Translate",
#         'data': str(predictions[0][0])
#     }

#     return data


if __name__ == "__main__":
    app.run(port=5000, debug=True)
