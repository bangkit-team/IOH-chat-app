import pycld2 as cld2
from langdetect import detect


class Translator:
    def __init__(self, model_path, input_word_index, target_index_word, maxlen):
        self.input_word_index = input_word_index
        self.target_index_word = target_index_word
        self.maxlen = maxlen
        self.model_path = model_path

        self._load_model()
        self._load_vocab()

    def _load_model(self):
        self.model = tf.keras.models.load_model(self.model_path, compile=True)

    def _load_vocab(self):
        with open(self.input_word_index) as f:
            self.input_vocab = json.load(f)

        with open(self.target_index_word) as f:
            vocab = json.load(f)
            self.target_vocab = {int(k): v for k, v in vocab.items()}

    def _normalize_and_preprocess(self, text):
        punctuation = '!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~\t\n'

        text = text.lower().strip()
        text = "".join((filter(lambda x: x not in punctuation, text)))

        return text

    def _texts_to_sequences(self, text):
        words = text.split(" ")
        sequences = list()

        for word in words:
            if word in self.input_vocab.keys():
                token = self.input_vocab[word]
                sequences.append(token)

        return sequences

    def _sequences_to_texts(self, sequences):
        words = list()

        for token in sequences:
            if token in self.target_vocab.keys():
                word = self.target_vocab[token]
                words.append(word)

        return words

    def lang_detector(self, sentence):
        return detect(sentence)

    def translate(self, sentence):
        index_prediction = list()
        normalize_sentence = self._normalize_and_preprocess(sentence)

        sequences = self._texts_to_sequences(normalize_sentence)
        sequences = pad_sequences(
            [sequences], maxlen=self.maxlen, padding="post", truncating="post")

        predictions = self.model(sequences)

        for i in predictions[0]:
            index_prediction.append(np.argmax(i))

        marks = [start_mark, end_mark]
        result = self._sequences_to_texts(index_prediction)

        result = " ".join([word for word in result if word not in marks])

        return result


if __name__ == "__main__":
    input_wi = "/content/input_word_index.json"
    target_iw = "/content/target_index_word.json"

    translator = Translator(
        saved_model_path,
        input_wi,
        target_iw,
        input_maxlen,
    )
    text_input = "what are you doing"
    lang_detector = translator.lang_detector(text_input)

    if lang_detector == "en":
        translate = translator.translate(text_input)
        print(translate)
    else:
        print("Bahasa tidak dikenali")
