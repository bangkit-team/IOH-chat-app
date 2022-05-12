import csv
import json


def load_data():
    return load_dummyktp(), load_wilayah(), load_negara()


def load_dummyktp():
    with open("datasets/user/src/dummy-ktp.json") as _:
        f = json.load(_)
        nama_laki = f[0]["laki-laki"]
        nama_perempuan = f[0]["perempuan"]
        nama_jalan = f[0]["jalan"]
        nama_agama = f[0]["agama"]
        nama_pekerjaan = f[0]["pekerjaan"]
        status_perkawinan = f[0]["status-perkawinan"]
        golongan_darah = f[0]["golongan-darah"]
        kewarganegaraan = f[0]["kewarganegaraan"]
    return nama_laki, nama_perempuan, nama_jalan, nama_agama, nama_pekerjaan, status_perkawinan, golongan_darah, kewarganegaraan


def load_wilayah():
    with open("datasets/user/src/desa.csv") as _:
        csvreader = csv.reader(_)
        next(csvreader)
        code_desa = []
        parent_code_desa = []
        name_desa = []
        for code, parent_code, name in csvreader:
            code_desa.append(code)
            parent_code_desa.append(parent_code)
            name_desa.append(name)

    with open("datasets/user/src/kecamatan.csv") as _:
        csvreader = csv.reader(_)
        next(csvreader)
        code_kecamatan = []
        parent_code_kecamatan = []
        name_kecamatan = []
        for code, parent_code, name in csvreader:
            code_kecamatan.append(code)
            parent_code_kecamatan.append(parent_code)
            name_kecamatan.append(name)

    with open("datasets/user/src/kabupaten.csv") as _:
        csvreader = csv.reader(_)
        next(csvreader)
        code_kabupaten = []
        parent_code_kabupaten = []
        name_kabupaten = []
        for code, parent_code, name in csvreader:
            code_kabupaten.append(code)
            parent_code_kabupaten.append(parent_code)
            name_kabupaten.append(name)

    with open("datasets/user/src/provinsi.csv") as _:
        csvreader = csv.reader(_)
        next(csvreader)
        code_provinsi = []
        parent_code_provinsi = []
        name_provinsi = []
        for code, parent_code, name in csvreader:
            code_provinsi.append(code)
            parent_code_provinsi.append(parent_code)
            name_provinsi.append(name)

    return code_desa, parent_code_desa, name_desa, code_kecamatan, parent_code_kecamatan, name_kecamatan, code_kabupaten, parent_code_kabupaten, name_kabupaten, code_provinsi, parent_code_provinsi, name_provinsi


def load_negara():
    with open("datasets/user/src/country.json") as f:
        negara = []
        d = json.load(f)
        for i in d:
            negara.append(i["name"])
        return negara
