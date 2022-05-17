import json
import os
import shutil
import string
import time
import zipfile

import pandas as pd
from gtts import gTTS

IDX = 0


def loadWords(file_dir):
    punctuation = "".join([i for i in string.punctuation if i != "-"])
    words = set()

    df = pd.read_csv(file_dir, sep=",")
    sentences = df.Indonesia

    for sentence in sentences:
        sentence = sentence.split(" ")
        for word in sentence:
            filtered_words = " ".join(
                (filter(lambda c: c not in punctuation, word))).lower()
            words.add(filtered_words)

    return words


def convertTextToSpeech(words, lang, save_dir, **kwargs):
    for word in words:
        if word != '':
            txtToSpeech = gTTS(word, lang=lang)

            if not os.path.exists(save_dir):
                os.makedirs(save_dir)
            filedir = os.path.join(save_dir, f"{word}.wav")
            txtToSpeech.save(filedir)
            time.sleep(10)


def archiveAudioFile(file_dir, save_dir):
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)

    end_dir_name = file_dir.split("/")[-1]
    is_file_exsits = os.path.exists(os.path.join(
        save_dir + "/", f"{end_dir_name}.zip"))

    fixed_filename = os.path.join(save_dir + "/", f"{end_dir_name}.zip")
    extended_filename = os.path.join(
        save_dir + "/", f"{end_dir_name}{IDX}.zip")

    filename = ""

    if is_file_exsits:
        IDX += 1
        filename = extended_filename
    else:
        IDX = 0
        filename = fixed_filename

    zf = zipfile.ZipFile(filename, "w")

    for file in os.listdir(file_dir):
        file_path = os.path.join(file_dir, file)

        zf.write(file_path)

    zf.close()
    shutil.rmtree(file_dir)


def main():
    AUDIO_DIR = "audio"
    SPEECH_DIR = "datasets/speech"

    lang_id = "id"
    myWords = loadWords("datasets/translate sentence/result/eng-ind.csv")

    convertTextToSpeech(myWords, lang_id, AUDIO_DIR)
    archiveAudioFile(AUDIO_DIR, SPEECH_DIR)


if __name__ == "__main__":
    main()
