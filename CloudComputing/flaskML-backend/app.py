import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import shutil
import tensorflow as tf
import numpy as np


from translate_class import Translator
from feedback_class import FeedbackPredict

# set folder
upload_folder = 'img/'
ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'png'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = upload_folder

# non chat model
model_nonchat = tf.keras.models.load_model("saved_model_nonchat")

# translate class
# saved_model_path = "saved_model_translate"
# input_tokenizer_dir = 'json_translate/input_tokenizer.json'
# target_tokenizer_dir = 'json_translate/target_tokenizer.json'

# translator = Translator(
#     saved_model_path,
#     input_tokenizer_dir,
#     target_tokenizer_dir,
#     20
# )

# load model dari folder saved_model
# model_feedback = tf.keras.models.load_model("saved_model_feedback")
# feedback_predict = FeedbackPredict(
#     "saved_model_feedback", "json_feedback/vocab.json")


@app.route('/', methods=['GET'])
def home():
    return "success"


# sebelum dikirim atau dimasukkan ke firebase realtime database, dicek dulu di ML
@app.route('/nonchat', methods=['POST'])
def nonchat():
    # untuk terima gambar
    file = request.files['image']
    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    path = os.path.join("img/", filename)
    img = tf.keras.preprocessing.image.load_img(
        path, color_mode="rgb", target_size=(224, 224))
    x = tf.keras.preprocessing.image.img_to_array(img)
    x /= 255
    x = np.expand_dims(x, axis=0)
    images = np.vstack([x])

    # lebih dari 0.5 = non chat
    # kurang dari 0.5 = chat
    # output string
    hasil = model_nonchat.predict(images)
    hasil = str(hasil[0][0])

    # delete the image
    os.remove(path)

    return jsonify(message=hasil)


@app.route('/speech', methods=['POST'])
def speech():
    return "Flask server for /speech"


# @app.route('/translate', methods=['POST'])
# def translatetext():
#     try:
#         # untuk terima text
#         data = request.json
#         text_input = data['message']

#         translate = translator(text_input)

#         return jsonify(message=translate)
#     except Exception:
#         return jsonify(message="Translate Predict Error")


# # get feedback from nodejs using axios and return ML result
# @app.route('/feedback', methods=['POST'])
# def feedback():
#     try:
#         data = request.json
#         feedback = data['message']

#         hasil = feedback_predict(feedback)

#         return jsonify(result=float(hasil))
#     except Exception:
#         return jsonify(message="Feedback Predict Error")


if __name__ == "__main__":
    app.run(port=5000, debug=True)
