import csv
import re


def filterText():
    fileDir = "D:/Programming/ML/Datasets/texts/ind-eng/ind.txt"
    corpus = list(dict())

    with open(fileDir, encoding="utf8") as file:
        for text in file.readlines():
            result = re.findall(r"^.*CC-BY", text)
            filtered_text = result[0].replace("\tCC-BY", "")
            filtered_text = filtered_text.split("\t")

            english_sentence = filtered_text[0]
            indonesia_sentence = filtered_text[1]

            diction = dict()
            diction["English"] = english_sentence
            diction["Indonesia"] = indonesia_sentence
            corpus.append(diction)
    return corpus


def convertToCSV(sentenceDict):
    columns = ["English", "Indonesia"]
    fileDir = "D:/Programming/ML/IOH/Datasets/eng-ind.csv"

    try:
        with open(fileDir, "w", encoding='utf8', newline="") as file:
            writer = csv.DictWriter(file, columns)
            writer.writeheader()
            for data in sentenceDict:
                writer.writerow(data)
            print("Data berhasil ditambahkan")
    except IOError:
        print("I/O Error")


if __name__ == "__main__":
    filtered_sentence = filterText()
    convertToCSV(filtered_sentence)
