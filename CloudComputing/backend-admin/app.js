const admin = require('./routes/adminRoute')

const express = require('express')
const app = express()

//connect dotenv
require("dotenv").config();

const port = process.env.PORT || 3000

// connect to realtime database
require('./utils/firestore')

app.use(express.json())
app.use(express.static('public'));

//cors
const cors=require("cors");
const { response } = require('express')
const corsOptions ={
    origin:true, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));

app.use('/admin', admin);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

