const user = require('./routes/userRoute')
const login = require('./routes/loginRoute')
const group = require('./routes/groupRoute')
const feedback = require('./routes/feedbackRoute')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// connect to realtime database
require('./utils/firestore')

//connect to cloud storage
require('./utils/cloudStorage')

//connect dotenv
require("dotenv").config();

//connect with flask
const request = require('request');

app.use(express.json())
app.use(express.static('public'));

app.use('/user', user)
app.use('/login', login)
app.use('/user/:user_id/group',group)
app.use('/user/feedback',feedback)


app.get('/', (req, res) => {
  res.send('index')
})

app.get('/home', function(req, res) {
  request('http://127.0.0.1:5000/speech', function (error, response, body) {
      console.error('error:', error); // Print the error
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the data received
      res.send(body); //Display the response on the website
    });      
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
