const user = require('./routes/userRoute')
const login = require('./routes/loginRoute')
const group = require('./routes/groupRoute')
const feedback = require('./routes/feedbackRoute')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// connect to realtime database
require('./utils/firestore')

//connect dotenv
require("dotenv").config();

app.use(express.json())
app.use(express.static('public'));

app.use('/user', user)
app.use('/login', login)
app.use('/user/:user_id/group',group)
app.use('/user/feedback',feedback)


app.get('/', (req, res) => {
  res.send('index')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
