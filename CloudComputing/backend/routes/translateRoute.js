const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')
const annRef = db.ref('/announcements')
const verify = require('./verifyToken');
const axios = require('axios');

const translateML = async (translate) =>{
    try{
        return await axios({
            method: 'post',
            url: "http://127.0.0.1:5000/translate",
            data: {
                message: translate
            }
    });
    }catch(error){
        return res.status(500).send({message: "Error Predict"})
    }
}


router.post('/', verify, async(req,res) =>{
     
    try{

        //axios to flask ML
        const predict_translate = await translateML(req.body.message)

        //masukin ke realtime database hasil predict
        const announceRef = db.ref('/announcements');
        let updateTranslate = ""

        if (predict_translate.data.message === ""){
            updateTranslate = {
                messageTranslate: req.body.message
            }
        }else{
            updateTranslate = {
                messageTranslate: predict_translate.data.message
            }
        }

        let id_divisi = ""
        announceRef.once('value', snapshot =>{
            snapshot.forEach((data) =>{
                if(data.val().nama_divisi == req.body.divisi){
                    id_divisi = data.key
                }
            })

            const announceMsgRef = db.ref('/announcements/'+id_divisi+'/chat')
            announceMsgRef.child(req.body.id_message).update(updateTranslate);      

            res.status(200).send({
                message: `Success Store Translate`,
                code: 1
            });
        })
    }catch(e){
        res.status(500).send({
            message: "Internal Server Error",
            code: 0
        });
    }
})

module.exports = router