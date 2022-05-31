const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')

router.post('/', (req,res) =>{
    const id_user= req.body.id_user;
    const feedback = req.body.feedback;
    
    if (!feedback) {
        res.status(400).send({ message: "Belum ada feedback" })
    }
    
    //today date
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    const today = mm + '/' + dd + '/' + yyyy;

    const feedbackRef = db.ref('/feedbacks');

    try{
        feedbackRef.child(id_user).set({
            feedback: req.body.feedback,
            timestamp: today
        })
    
        res.status(200).send({ message: `Feedback kamu: ${feedback}`});
    }catch(error){
        res.status(500).send({message: "Error when add feedback"})
    }
})

module.exports = router
