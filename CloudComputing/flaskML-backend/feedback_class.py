import json

import keras
import numpy as np
from keras.preprocessing.text import tokenizer_from_json
from tensorflow.keras.preprocessing.sequence import pad_sequences


class FeedbackPredict:
    def __init__(self, model_path, tokenier_json_path, maxlen=309):
        self.model_path = model_path
        self.tokenier_json_path = tokenier_json_path
        self.padding = 'post'
        self.truncating = 'post'
        self.maxlen = maxlen

        self._load_model()
        self._load_tokenizer()

    def _load_model(self):
        self.model = keras.models.load_model(self.model_path, compile=True)

    def _load_tokenizer(self):
        with open(self.tokenier_json_path) as f:
            data = json.load(f)
            self.tokenizer = tokenizer_from_json(data)

    def __call__(self, feedback):
        sequences = self.tokenizer.texts_to_sequences([feedback])
        pad_seqs = pad_sequences(sequences,
                                 padding=self.padding,
                                 truncating=self.truncating,
                                 maxlen=self.maxlen)

        prediction = self.model.predict(pad_seqs)[0][0]
        return prediction
