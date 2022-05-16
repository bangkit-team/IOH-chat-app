const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')

router.post('/:id_user', (req,res) =>{
    const { id_user } = req.params;
    const { feedback } = req.body.feedback;
    if (!feedback) {
        res.status(500).send({ message: "Belum ada feedback" })
    }

    const feedbackRef = db.ref('/feedbacks');
    feedbackRef.child(id_user).set({
        feedback: req.body.feedback
    })

    res.status(200).send({ message: `Feedback kamu: ${feedback}`});
})

module.exports = router