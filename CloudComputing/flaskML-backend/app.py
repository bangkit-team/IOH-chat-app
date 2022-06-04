import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
# import tensorflow as tf
# import numpy as np

# set folder
upload_folder = '/img'
ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'png'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = upload_folder

# non chat model
# model = tf.keras.models.load_model("saved_model")


@app.route('/', methods=['GET'])
def home():
    return "success"


@app.route('/nonchat', methods=['POST'])
def nonchat():
    try:
        # image = request.form['image']
        # print(image)

        # untuk terima gambar
        file = request.files['image']
        filename = file.filename

        file.save(os.path.join(app))
        # print(file)

        # path = "img\sschat.png"
        # img = tf.keras.preprocessing.image.load_img(
        #     path, color_mode="rgb", target_size=(224, 224))
        # x = tf.keras.preprocessing.image.img_to_array(img)
        # x /= 255
        # x = np.expand_dims(x, axis=0)
        # images = np.vstack([x])

        # lebih dari 0.5 = non chat
        # kurang dari 0.5 = chat
        # output string
        # hasil = model.predict(images)
        # hasil = str(hasil[0][0])

        return "success"
    except Exception:
        return "NonChat Predict Error"


@app.route('/speech', methods=['POST'])
def speech():
    return "Flask server for /speech"


@app.route('/translate', methods=['POST'])
def translatetext():
    try:
        # untuk terima text
        data = request.json
        message = data['message']

        return jsonify(message=message)
    except Exception:
        return jsonify(message="Translate Predict Error")


# get feedback from nodejs using axios and return ML result
@app.route('/feedback', methods=['POST'])
def feedback():
    try:
        data = request.json
        feedback = data['message']
        return jsonify(result=feedback)
    except Exception:
        return jsonify(message="Feedback Predict Error")


if __name__ == "__main__":
    app.run(port=5000, debug=True)
