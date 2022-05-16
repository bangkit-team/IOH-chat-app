const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')

router.get('/:chat_id', (req,res)=>{
    res.send('ini untuk tampilin chat secara realtime')
})

router.post('/:chat_id', (req,res)=>{
    res.send('ini untuk masukkin chat')   
})


module.exports = router