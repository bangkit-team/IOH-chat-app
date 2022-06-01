import tensorflow as tf
import numpy as np

model = tf.keras.models.load_model("saved_models")
model.summary()



path = "/home/vannyezha/project/IOH-chat-app/Machine Learning/code/chat_non_chat/src/IOH.png"
img = tf.keras.preprocessing.image.load_img(path,color_mode="rgb", target_size=(224, 224))
x = tf.keras.preprocessing.image.img_to_array(img)
x /= 255

x = np.expand_dims(x, axis=0)
images = np.vstack([x])

# lebih dari 0.5 = non chat
# kurang dari 0.5 = chat
# output string
hasil = model.predict(images)
hasil = str(hasil[0][0])
print(hasil)
