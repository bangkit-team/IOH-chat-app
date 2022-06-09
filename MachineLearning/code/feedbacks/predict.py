import tensorflow as tf
import re,string
import json
import numpy as np

# ini cuma declare fungsi sama load vocab
with open("saved_model/tokenizer.json") as f:
    vocab = json.load(f)

def preprocess(ulasan):
    ulasan = ulasan.lower() 
    ulasan = ulasan.strip()  
    ulasan = re.compile('<.*?>').sub('', ulasan) 
    ulasan = re.compile('[%s]' % re.escape(string.punctuation)).sub(' ', ulasan)  
    ulasan = re.sub('\s+', ' ', ulasan)  
    ulasan = re.sub(r'\[*\]',' ',ulasan) 
    ulasan = re.sub(r'[^\w\s]', '', str(ulasan).lower().strip())
    ulasan = re.sub(r'\d',' ',ulasan) 
    ulasan = re.sub(r'\s+',' ',ulasan) 
    return ulasan

def remove_stopwords(ulasan):
    # List of stopwords
    stopwords = ["yang", "untuk", "pada", "ke", "para", "namun", "menurut", "antara", "dia", "dua", "ia", "seperti", 
              "jika", "sehingga", "kembali", "dan", "karena", "kepada", "oleh", "saat", "harus", "sementara", 
              "setelah", "belum", "kami", "sekitar", "bagi", "serta", "di", "dari", "telah", "sebagai", "masih", 
              "hal", "ketika", "adalah", "itu", "dalam", "bisa", "bahwa", "atau", "hanya", "kita", "dengan", "akan", 
              "juga", "ada", "mereka", "sudah", "saya", "terhadap", "secara", "agar", "lain", "anda", "begitu", "mengapa", 
              "kenapa", "yaitu", "yakni", "daripada", "itulah", "lagi", "maka", "tentang", "demi", "dimana", "kemana",
              "pula", "sambil", "sebelum", "sesudah", "supaya", "guna", "kah", "pun", "sampai", "sedangkan", "selagi",
              "sementara", "tetapi", "apakah", "kecuali", "sebab", "selain", "seolah", "seterusnya", "tanpa", "agak",
              "boleh", "dapat", "dsb", "dst", "dll", "dahulu", "dulunya", "anu", "demikian", "tapi", "ingin", "juga",
              "nggak", "mari", "nanti", "melainkan", "oh", "ok", "seharusnya", "sebetulnya", "setiap", "setidaknya",
              "sesuatu", "pasti", "saja", "toh", "walau", "tolong", "tentu", "amat", "apalagi", "bagaimanapun",
              "dengan", "ia", "bahwa", "oleh"]

    # Ulasan converted to lowercase-only
    ulasan = str(ulasan).lower()
    
    ### START CODE HERE
    
    # Use this to read file content as a stream:
    words = ulasan.split()
    ulasan = []
    for r in words:
        if not r in stopwords:
            ulasan.append(r)
            
    ulasan=" ".join(ulasan)
    ### END CODE HERE
    return ulasan

def sequenize(source):
    seq = list()
    counter = 16
    source = remove_stopwords(preprocess(source)).split()
    for i in source:
        if i in vocab.keys():
            counter -= 1
            seq.append(int(vocab[i]))
            if counter == 0:
                return [seq]
        else:
            counter -= 1
            seq.append(1)
            if counter == 0:
                return [seq]
    for i in range(counter):
        seq.append(0)
    return [seq]

# load model dari folder saved_model
model = tf.keras.models.load_model("saved_model")

# predict 
teks = "autoscroll bawah tidak dinonaktifkan sangat mengganggu membaca riwayat obrolan mencari memilih hasil tidak daftar semua hasil pencarian mengklik tombol pencarian scoll diatur ulang ini bukan ilmu roket sebuah ulasan lengkap"

hasil = model.predict(sequenize(teks))
print(hasil[0])
