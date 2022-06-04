import argparse
import json

import numpy as np

from module import GenerateData

my_parser = argparse.ArgumentParser()
my_parser.add_argument("--m", type=int, required=False)
my_parser.add_argument("--lm", type=int, required=False)
my_parser.add_argument("--f", type=int, required=False)
my_parser.add_argument("--lf", type=int, required=False)
my_parser.add_argument("--s", type=int, required=False)
my_parser.add_argument("--o", type=str, required=False)

args = my_parser.parse_args()


if args.s:
    seed = args.s
else:
    seed = 3650

if args.m:
    cowo = args.m
else:
    cowo = 0
if args.lm:
    length_cowo = args.lm
else:
    length_cowo = 1

if args.f:
    cewe = args.f
else:
    cewe = 0
if args.lf:
    length_cewe = args.lf
else:
    length_cewe = 1

if args.o:
    fname = args.o
else:
    fname = "user"

np.random.seed(seed)

seed_cowo = np.random.choice(100000, cowo, replace=False)
seed_cewe = np.random.choice(100000, cewe, replace=False)

data = []

if cowo:
    for seed in seed_cowo:
        d = GenerateData(seed, "cowo", np.random.randint(1, length_cowo+1))
        dictionary = {
            "name": d.name,
            "username": d.username,
            "email": d.email,
            "phone_number": d.phone_number,
            "gender": d.gender,
            "born_date": str(d.born_date),
            "born_place": d.born_place,
            "nationality": d.nationality,
            "address": {
                "street": d.street,
                "rt": d.rt,
                "rw": d.rw,
                "village": d.desa,
                "subdistrict": d.kecamatan,
                "district": d.kabupaten,
                "province": d.provinsi
            },
            "ktp": {
                "nik": d.nik,
                "valid_till": str(d.valid_till),
                "card_create_date": str(d.date_making),
                "card_create_place": d.place_making,
                "religion": d.religion,
                "status": d.status,
                "occupation": d.occupation,
                "blood_type": d.goldar,
            }
        }
        data.append(dictionary)
if cewe:
    for seed in seed_cewe:
        d = GenerateData(seed, "cewe", np.random.randint(1, length_cewe+1))
        dictionary = {
            "name": d.name,
            "username": d.username,
            "email": d.email,
            "phone_number": d.phone_number,
            "gender": d.gender,
            "born_date": str(d.born_date),
            "born_place": d.born_place,
            "nationality": d.nationality,
            "address": {
                "street": d.street,
                "rt": d.rt,
                "rw": d.rw,
                "village": d.desa,
                "subdistrict": d.kecamatan,
                "district": d.kabupaten,
                "province": d.provinsi
            },
            "ktp": {
                "nik": d.nik,
                "valid_till": str(d.valid_till),
                "card_create_date": str(d.date_making),
                "card_create_place": d.place_making,
                "religion": d.religion,
                "status": d.status,
                "occupation": d.occupation,
                "blood_type": d.goldar,
            }
        }
        data.append(dictionary)

with open(f"../../datasets/user/output/{fname}.json", "w") as f:
    try:
        json.dump(data, f, indent=6)
        print("File berhasil dibuat")
    except IOError:
        print("I/O Error")
