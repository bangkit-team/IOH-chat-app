import json

import numpy as np
import tensorflow as tf
from langdetect import detect
from tensorflow.keras.preprocessing.sequence import pad_sequences


class Translator(tf.Module):
    def __init__(self, model_path, inp_word_index, targ_index_word, maxlen):
        self.model_path = model_path
        self.inp_word_index = inp_word_index
        self.targ_index_word = targ_index_word
        self.maxlen = maxlen

        self._load_model()
        self._load_vocab()

    def _load_model(self):
        self.model = tf.keras.models.load_model(self.model_path, compile=True)

    def _load_vocab(self):
        inp_json = open(self.inp_word_index)
        self.inp_vocab = json.load(inp_json)
        inp_json.close()

        targ_json = open(self.targ_index_word)
        vocab = json.load(targ_json)
        self.targ_vocab = {int(k): v for k, v in vocab.items()}
        targ_json.close()

    def _normalize_and_preprocess(self, text):
        punctuation = '!"#$%&()*+,-./:;=?@[\\]^_`{|}~\t\n'

        text = text.lower().strip()
        text = ''.join((filter(lambda x: x not in punctuation, text)))

        return text

    def _texts_to_sequences(self, text):
        words = text.split(" ")
        sequences = list()

        for word in words:
            if word in self.inp_vocab.keys():
                token = self.inp_vocab[word]
                sequences.append(token)

        return sequences

    def _sequences_to_texts(self, sequences):
        words = list()

        for token in sequences:
            if token in self.targ_vocab.keys():
                word = self.targ_vocab[token]
                words.append(word)

        return words

    def lang_detector(self, sentence):
        return detect(sentence)

    def __call__(self, sentence):
        index_prediction = list()

        normalize_sentence = self._normalize_and_preprocess(sentence)
        sequences = self._texts_to_sequences(normalize_sentence)
        sequences = pad_sequences(
            [sequences], maxlen=self.maxlen, padding="post", truncating="post")

        predictions = self.model(sequences)

        for i in predictions[0]:
            index_prediction.append(np.argmax(i))

        marks = ['<start>', '<end>']
        result = self._sequences_to_texts(index_prediction)
        result = ' '.join([word for word in result if word not in marks])

        return result


if __name__ == "__main__":
    saved_model_path = "code/translation/resources/saved_model"
    inp_vocab_path = 'code/translation/resources/inp_wi.json'
    targ_vocab_path = 'code/translation/resources/targ_iw.json'

    translator = Translator(
        saved_model_path,
        inp_vocab_path,
        targ_vocab_path,
        15)

    text_input = 'how are you'
    lang_detector = translator.lang_detector(text_input)

    if lang_detector == 'en':
        translate = translator(text_input)
        print(translate)
    else:
        print('Bahasa tidak dikenali')
