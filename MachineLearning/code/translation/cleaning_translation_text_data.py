import csv
import re


class CleanData:
    def __init__(self, filename, columns):
        self._corpus = list(dict())
        self._filename = filename
        self._columns = columns
        self._filterText(self._filename, self._columns)

    def _filterText(self, filename, columns):
        fileDir = f"datasets/translate sentence/untidy/{filename}.txt"
        with open(fileDir, encoding="utf8") as file:
            for text in file.readlines():
                result = re.findall(r"^.*CC-BY", text)
                filtered_text = result[0].replace("\tCC-BY", "")
                filtered_text = filtered_text.split("\t")

                language1_sentence = filtered_text[0]
                language2_sentence = filtered_text[1]

                diction = dict()
                diction[columns[0]] = language1_sentence
                diction[columns[1]] = language2_sentence
                self._corpus.append(diction)

    def convertToCSV(self, filename):
        fileDir = f"datasets/translate sentence/result/{filename}.csv"

        try:
            with open(fileDir, "w", encoding='utf8', newline="") as file:
                writer = csv.DictWriter(file, self._columns)
                writer.writeheader()
                for data in self._corpus:
                    writer.writerow(data)
                print(f"File {filename} berhasil dibuat")
        except IOError:
            print(f"File {filename} gagal dibuat")


if __name__ == "__main__":
    txtFileName = ["ind", "deu", "jpn"]
    savedFileName = ["eng-ind", "eng-deu", "eng-jpn"]
    columns = [["English", "Indonesia"], [
        "English", "Deutch"], ["English", "Japan"]]

    for txt, filename, column in zip(txtFileName, savedFileName, columns):
        cleanData = CleanData(txt, column)
        cleanData.convertToCSV(filename)
