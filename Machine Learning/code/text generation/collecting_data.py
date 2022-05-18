import os

import pandas as pd


def load_data(path):
    sentences = list()

    df = pd.read_csv(path)
    sentences.append(df.Indonesia)

    return sentences


def convert_to_txt(path, sentences):
    with open(path, "w", encoding="utf-8") as f:
        for row in sentences:
            f.write(row)
            f.write("\n")


def main():
    TXT_DIR = "datasets/text generation/sentence.txt"
    FILE_DIR = "datasets/translate sentence/result/eng-ind.csv"
    files = load_data(FILE_DIR)

    for file in files:
        convert_to_txt(TXT_DIR, file)


if __name__ == "__main__":
    main()
