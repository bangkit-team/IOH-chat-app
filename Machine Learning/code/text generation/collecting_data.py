import csv
import os


def load_data(path):
    sentence = list()

    with open(path, encoding="utf-8") as f:
        csv_reader = csv.reader(f)
        next(csv_reader)

        for row in csv_reader:
            sentence.append(row[1])

    return sentence


def convert_to_txt(path, sentence):
    mode = "w"
    if not os.path.exists(path):
        mode = "w"
    else:
        mode = "a"

    with open(path, mode, encoding="utf-8") as f:
        for row in sentence:
            if len(row.split(" ")) >= 20:
                f.write(" ".join(row.split(" ")[:20]))
                f.write("\n")
            elif len(row.split(" ")) >= 10:
                f.write(row)
                f.write("\n")


def main():
    TXT_DIR = "datasets/text generation/sentence.txt"
    FILE_DIR = ["datasets/translate sentence/result/eng-ind.csv",
                "datasets/feedbacks/data_feedbacks.csv"]
    files = [load_data(dir) for dir in FILE_DIR]

    for file in files:
        convert_to_txt(TXT_DIR, file)


if __name__ == "__main__":
    main()
