const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')

// router.post('/',(req, res) =>{
//     res.send('This is login routes')
// })

router.get('/',(req, res) =>{
    // res.send('This is login routes')
    const doc = db.collection('Users').doc('test2');

    const observer = doc.onSnapshot(docSnapshot => {
      console.log(`Received doc snapshot: ${docSnapshot}`);
      // ...
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
})

module.exports = router