const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')

router.get('/:chat_id', (req,res)=>{
    const chatRefId = db.ref('/chats/'+req.params.chat_id+'/chat');

    chatRefId.on('child_added', (snapshot, prevChildKey) => {
        const newPost = snapshot.val();
        console.log('Sender: ' + newPost.sender);
        console.log('Message: ' + newPost.message);
        console.log('Timestamp: ' + newPost.timestamp);
        console.log('Previous Post ID: ' + prevChildKey);
    });

})

router.post('/:chat_id', (req,res)=>{
    const chatRefId = db.ref('/chats/'+req.params.chat_id+'/chat');

    const date = new Date();
    const dateToday = date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()

    try{
        chatRefId.push().set({
            sender: req.body.sender,
            message: req.body.message,
            timestamp: dateToday
        })

        
        res.status(200).send({message: "Pesan berhasil dikirim"})
    }catch(error){
        res.status(500).send({message: "Pesan gagal dikirim"})
    }  
})

router.delete('/:chat_id', (req,res)=>{
    const chatRefDel = db.ref('/chats/'+req.params.chat_id+'/chat/-N2GQDqqBRMg0PR1NHlm')
    chatRefDel.remove();
    res.send('success');
})


module.exports = router