import tensorflow as tf
import tensorflow_text as text #harus ada library ini

model = tf.keras.models.load_model("saved_model")

teks = [
        "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka and others share their thoughts on LinkedIn",
        "Kanao, welcome to Samsung",
        "[educba.com] Angular JS Certification Training Course (9 Courses, 5+ Projects)",
        "PTEB UTS 07111940000001",
        "Lomba Desain IG : itsmeeeaow",
        "Photo from Vanny Ezha",
        "SPCS1_tugas03_07111940000001",
        "Pendaftaran Akun Kampus Merdeka",
]

hasil = model(tf.constant(teks))
print(hasil)