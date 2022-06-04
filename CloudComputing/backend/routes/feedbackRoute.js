const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')
const {feedbackValidation} = require('../validate')
const verify = require('./verifyToken');
const axios = require('axios');

const feedbackML = async (feedback) =>{
    try{
        return await axios({
            method: 'post',
            url: "http://127.0.0.1:5000/feedback",
            data: {
                message: feedback
            }
    });
    }catch(error){
        return res.status(500).send({message: "Error Predict"})
    }
}

router.post('/', verify, async(req,res) =>{
    const {error} = feedbackValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const feedback = req.body.feedback;
    
    if (!feedback) {
        return res.status(400).send({ message: "Belum ada feedback" })
    }
    
    try{
        //today date
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        const today = mm + '/' + dd + '/' + yyyy;

        //add feedback to firebase realtime database
        const feedbackRef = db.ref('/feedbacks');
        const feedbackKey = feedbackRef.push().key;

        feedbackRef.child(feedbackKey).set({
            feedback: req.body.feedback,
            timestamp: today
        })

        //axios to flask ML
        const predict_feedback = await feedbackML(req.body.feedback)
        console.log(predict_feedback.data.result)

        res.status(200).send({ message: `Success Send Feedback`});
    }catch(e){
        res.status(500).send({message: "Internal Server Error"});
    }
})

module.exports = router
