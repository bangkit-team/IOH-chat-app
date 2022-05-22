const user = require('./routes/userRoute')
const login = require('./routes/loginRoute')
const group = require('./routes/groupRoute')
const feedback = require('./routes/feedbackRoute')

const express = require('express')
const app = express()

//connect dotenv
require("dotenv").config();

const port = process.env.PORT || 3000

// connect to realtime database
require('./utils/firestore')

//connect to cloud storage
require('./utils/cloudStorage')

//connect with flask
const request = require('request');

app.use(express.json())
app.use(express.static('public'));

//cors
const cors=require("cors");
const { response } = require('express')
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));

app.use('/user', user)
app.use('/login', login)
app.use('/user/:user_id/group',group)
app.use('/user/:user_id/feedback',feedback)


app.get('/', (req, res) => {
  res.json('send')
})

app.get('/logout', function(req, res) {
  res.json('send')     
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
