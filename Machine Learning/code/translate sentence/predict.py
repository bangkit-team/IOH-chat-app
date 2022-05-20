import tensorflow as tf

translate = tf.saved_model.load('saved_model')
input_text = tf.constant([
    'what dou you mean?',
    'This is translate feature', 
])
result = translate.tf_translate(input_text)

for i in result['text']:
  print(i.numpy().decode())