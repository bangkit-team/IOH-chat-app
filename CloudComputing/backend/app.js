const user = require('./routes/userRoute')
const login = require('./routes/loginRoute')
const group = require('./routes/groupRoute')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// connect to firestore
require('./utils/firestore')

//connect dotenv
require("dotenv").config();

app.use(express.json())
app.use(express.static('public'));

app.use('/user', user)
app.use('/login', login)
app.use('/user/:user_id/group',group)

app.get('/', (req, res) => {
  res.send('index')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})