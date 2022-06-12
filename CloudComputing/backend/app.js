const user = require('./routes/userRoute')
const login = require('./routes/loginRoute')
const group = require('./routes/groupRoute')
const feedback = require('./routes/feedbackRoute')
const announcement = require('./routes/announcementRoute')

// var multer = require('multer');
// var upload = multer();

const express = require('express')
const app = express()

//connect dotenv
require("dotenv").config();

const port = process.env.PORT || 3000

// connect to realtime database
require('./utils/firestore')

//connect to cloud storage
require('./utils/cloudStorage')

app.use(express.json())
app.use(express.static('public'));

// for parsing multipart/form-data
// app.use(upload.array()); 

// for parsing x-www-..
app.use(express.urlencoded({ extended: true }));

//cors
const cors=require("cors");
const corsOptions ={
    origin:true, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));

app.use('/user', user)
app.use('/login', login)
app.use('/user',group)
app.use('/feedback',feedback)
app.use('/user',announcement)

app.get('/', (req, res) => {
  res.send('send')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
