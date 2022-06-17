# Getting Started for Machine Learning Resources

1. Dataset Chat-Non-Chat Model
   - Collecting about 500 screenshot from Whatsapp, Line, Instagram, Shopee chat and 500 random screenshot from my own gallery (if you want to use our dataset please reach me out in Discord Amna#3650)
2. Dataset Feedback Classification Model
   - Scrapping from playstore feedback (Discord, Snapchat, Viber, Whatsapp)
   - [https://github.com/washingtonpost/data-random-chat-apps](https://github.com/washingtonpost/data-random-chat-apps)
3. Dataset Language Classification Model
   - [http://www.manythings.org/anki/](http://www.manythings.org/anki/)
4. Dataset Translation Model
   - [http://www.manythings.org/anki/](http://www.manythings.org/anki/) 
   - [https://www.kaggle.com/datasets/karthickveerakumar/spam-filter](https://www.kaggle.com/datasets/karthickveerakumar/spam-filter)
   - [https://huggingface.co/datasets/id_panl_bppt](https://huggingface.co/datasets/id_panl_bppt)

# Model Architecture
1. [Chat-Non-Chat](code/chat_non_chat/) (Transfer Learning)
    - Input (224, 224, 3) Layer 
    - [https://tfhub.dev/adityakane2001/regnety400mf_feature_extractor/1](https://tfhub.dev/adityakane2001/regnety400mf_feature_extractor/1)
    - Dense (512, activation="relu") Layer
    - Dense (1, activation="sigmoid") Layer
2. [Feedback Classification](code/feedbacks/)
    - Embedding (1388, 64) Layer
    - Bidirectional (LSTM (128)) Layer
    - Dense (128, activation='relu') Layer
    - Dropout (0.5) Layer
    - Dense (64, activation='relu') Layer
    - Dropout Layer 
    - Dense (1, activation='sigmoid') Layer
3. [Language Classification](code/binary_language_classification/)
    - Embedding (1000, 64, (32,)) Layer
    - Flatten Layer
    - Dense (64, activation="tanh") Layer
    - Dense (64, activation="tanh") Layer
    - Dense (32, activation="tanh") Layer
    - Dense (1, activation="sigmoid") Layer
4. [Translation](code/translation/) (Non Sequential)
    - We use reference from [https://www.tensorflow.org/text/tutorials/nmt_with_attention](https://www.tensorflow.org/text/tutorials/nmt_with_attention) and replace GRU with LSTM instead. We also try to wrap it all in ```tf.keras.models.Model``` (Keras API) to simplify the deployment process.

# Deployment Strategies
1. Language Classification
    - Purpose : We try to make this model run offline to reduce API call from Android apps to Server. So if we get a chat, first we must check whether it is english chat or bahasa chat, then if the result say english chat we continue to call API our Translation model. Otherwise, we do nothing because our Apps is desaigned for Indonesian chat only. 
    - We Optimize most important layer (Embedding layer) using [https://www.tensorflow.org/model_optimization](https://www.tensorflow.org/model_optimization) to avoid difference result when doing inferrence in python and kotlin. And our model is converted using ```tf.lite.TFLiteConverter.from_saved_model``` with ```tf.lite.Optimize.DEFAULT``` setting.
2. Chat-Non-Chat, Feedback Classification, Translation
    - These model run on Flask server because it is easier than we deploy on Android. We save our model using Tensorflow format ```model.save()``` and load it using ```tf.keras.models.load_model()```.

# Sugestion for next
- Try to collect informal chat data (scrapping from personal Whatsapp chat for instance) like slang word etc because when our model face formal word it runs well, otherwise our model confuse because dont recognize particular vocab.
- For Chat-Non-Chat model try to add more data with different appereance (Discord, linkdin chat etc), because when facing screenshot that have bubble chat format our model runs well, otherwise our model confuse because discord chat for instance has very different appereance with Whatsapp, Instagram chat and so on.