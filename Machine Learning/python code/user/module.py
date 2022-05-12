from load import load_data
import numpy as np
from numpy.random import choice,randint
import datetime

(nama_laki, 
 nama_perempuan, 
 nama_jalan, 
 nama_agama, 
 nama_pekerjaan, 
 status_perkawinan, 
 golongan_darah, 
 kebangsaan), (code_desa, 
               parent_code_desa, 
               name_desa,code_kecamatan, 
               parent_code_kecamatan, 
               name_kecamatan, 
               code_kabupaten, 
               parent_code_kabupaten, 
               name_kabupaten, 
               code_provinsi, 
               parent_code_provinsi, 
               name_provinsi), negara = load_data()

class GenerateData():
    def __init__(self,seed,gender,name_length):
        self.seed = seed
        self.gender = gender
        self.name_length = name_length
        np.random.seed(self.seed)
        self.name = self.__generate_nama(self.name_length)
        self.__generate_wilayah()
        self.street = "Jl. " + choice(nama_jalan).upper()
        self.__generate_ttl()
        self.goldar = choice(golongan_darah).upper()
        self.rt = str(randint(1,30)).zfill(3)
        self.rw = str(randint(1,30)).zfill(3)
        self.religion = choice(nama_agama).upper()
        self.status = choice(status_perkawinan).upper()
        self.occupation = choice(nama_pekerjaan)
        self.__generate_kewarganegaraan()
        self.__generate_tempat_tanggal_pembuatan_kartu()
        self.__generate_masa_berlaku()
        self.__generate_nik()
        self.__generate_email()
        self.__generate_phone_number()
        self.__generate_username()
    
    def __generate_nama(self,name_length):
        name = []
        if self.gender.lower() == "cewe" or self.gender.lower() == "female":
            for _ in range(name_length):
                name.append(choice(nama_perempuan))
            self.gender = "PEREMPUAN"
        elif self.gender.lower() == "cowo" or self.gender.lower() == "male":
            for _ in range(name_length):
                name.append(choice(nama_laki))
            self.gender = "LAKI-LAKI"
        return " ".join(name).upper()
    
    def __generate_wilayah(self):
        self.desa = np.random.choice(name_desa).upper()
        self.indeks_desa = code_desa[name_desa.index(self.desa)]
        self.indeks_kecamatan = parent_code_desa[name_desa.index(self.desa)]
        self.kecamatan = name_kecamatan[code_kecamatan.index(self.indeks_kecamatan)].upper()
        self.indeks_kabupaten = parent_code_kecamatan[name_kecamatan.index(self.kecamatan)]
        self.kabupaten = name_kabupaten[code_kabupaten.index(self.indeks_kabupaten)].upper()
        self.indeks_provinsi = parent_code_kabupaten[name_kabupaten.index(self.kabupaten)]
        self.provinsi = name_provinsi[code_provinsi.index(self.indeks_provinsi)].upper()
    
    def __generate_ttl(self):
        try:
            self.born_date = datetime.date(np.random.randint(1970,2000), 
                                       np.random.randint(1,13),
                                       np.random.randint(1,32))
            self.born_place = choice(name_kecamatan)
        except:
            self.born_date = datetime.date(np.random.randint(1970,2000), 
                                       np.random.randint(1,13),
                                       np.random.randint(1,28))
            self.born_place = choice(name_kecamatan)
            
    
    def __generate_kewarganegaraan(self):
        if self.occupation.upper() == "OTHERS":
            self.nationality = choice(negara).upper()
        else:
            self.nationality = "WNI"
    def __generate_tempat_tanggal_pembuatan_kartu(self):
        try:
            if self.nationality.upper() == "WNI":
                self.date_making = self.born_date + datetime.timedelta(days=randint(365*17,365*21))
                self.place_making = self.kecamatan
            else:
                self.date_making = datetime.date(np.random.randint(2019,2022), 
                                        np.random.randint(1,13),
                                        np.random.randint(1,32))
                self.place_making = self.kecamatan
        except:
            if self.nationality.upper() == "WNI":
                self.date_making = self.born_date + datetime.timedelta(days=randint(365*17,365*21))
                self.place_making = self.kecamatan
            else:
                self.date_making = datetime.date(np.random.randint(2019,2022), 
                                        np.random.randint(1,13),
                                        np.random.randint(1,28))
                self.place_making = self.kecamatan
            
    def __generate_masa_berlaku(self):
        if self.nationality.upper() == "WNI":
            self.valid_till = "SEUMUR HIDUP"
        else:
            self.valid_till = self.date_making + datetime.timedelta(days = 365*5)
    
    def __generate_nik(self):
        self.nik = str(self.indeks_kecamatan) + str(self.born_date.day).zfill(2) + str(self.born_date.month).zfill(2) + str(self.born_date.year)[-2:] + str(randint(1,200)).zfill(4)
    
    def __generate_email(self):
        domain = ["@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com"]
        suffix = "abcdefghijklmnopqrstufwxyz1234567890"
        self.email = self.name.split()[0].lower() + str(randint(0,2000)) + choice(list(suffix)) + choice(list(suffix)) + choice(list(suffix)) + choice(list(suffix)) + choice(domain)

    def __generate_phone_number(self):
        # prefix indosat : "62858", "62857", "62856", "62855", "62816", "62815", "62814"
        # prefix tri : "62896","62897","62898", "62899"
        prefix = ["62858", "62857", "62856", "62855", "62816", "62815", "62814", "62896","62897","62898", "62899"]
        self.phone_number = choice(prefix) + str(randint(12300000,99999999)).zfill(8)
    
    def __generate_username(self):
        try:
            suffix = choice(["aa","ae","ea","uu","wu","uw","ww","ak","kk","ii","iu","an","in","un","on"])
            rd_angka = str(randint(0,100)).zfill(2)
            rs = rd_angka+suffix
            sr = suffix+rd_angka
            suffix_style = [rd_angka, suffix, sr,rs]
            satu = self.name.split()[0].lower()
            dua = self.name.split()[0].lower()[2:] + self.name.split()[0].lower()[-2:]
            tiga = self.name.split()[0].lower()[:-2] + self.name.split()[0].lower()[:2]
            name_style = [satu, dua, tiga]
            if len(self.name.split()[0]) > 8:
                nama = self.name.split()[0]
                prob1 = nama[:randint(4,9)]
                prob2 = nama[len(nama) - (len(nama)-randint(4,9)):]
                nama = [prob1, prob2]
                satu = choice(nama)
                dua = choice(nama)[2:] + choice(nama)[-2:]
                tiga = choice(nama)[:2] + choice(nama)[:2]
                name_style = [satu, dua, tiga]
                self.username = self.username = (choice(name_style) + choice(suffix_style)).lower()
            elif len(self.name.split()[0]) <= 8 and len(self.name.split()[0]) >= 4:
                self.username = (choice(name_style) + choice(suffix_style)).lower()
            else:
                prob1 = (choice(name_style) + choice(name_style)  + choice(suffix_style)).lower()
                prob2 = (choice(name_style)  + choice(suffix_style) + choice(name_style)).lower()
                self.username = choice([prob1,prob2])
        except:
            self.username = None
