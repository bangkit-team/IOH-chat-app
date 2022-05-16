const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')

const groupRef = db.ref('/groups');
const chatRef = db.ref('/chats');

router.post('/',(req,res)=>{
    const group_id = groupRef.push().key;
    const id_chat = chatRef.push().key;

    const userRef = db.ref('/users/'+req.body.id_user+'/contact');
    const groupAddRef = db.ref('/groups/'+group_id+'/users')

    const date = new Date();
    const dateToday = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()

    try{
      groupRef.child(group_id).set({
        name: req.body.name,
        messages:id_chat,
        created_at: dateToday
      })

      groupAddRef.child(req.body.id_user).set({
        emailUser: req.body.email_user,
        join_timestamp:dateToday,
        out_timestamp: "-",
        group_role:"admin"
      })
  
      userRef.child(group_id).set({
        nameGroup: req.body.name
      })
  
      chatRef.child(id_chat).set({
        message: "Pesan Grup belum ada"
      })
    
      res.status(200).json({message: "Add new group success"});
    }catch(error){
      res.status(500).json({message: "Error when make a group"})
    }
})

router.post('/:group_id', (req,res)=>{
  const groupAddRef = db.ref('/groups/'+req.params.group_id+'/users');
  const userRef = db.ref('/users')

  let friendId = ''

  userRef.once('value', (snapshot) =>{
    snapshot.forEach((data) => {
      if(data.val().email === req.body.emailFriend){
          friendId = data.key
      }
    });

    const friendRef = db.ref('/users/'+friendId+'/contact');
    
    const date = new Date();
    const dateToday = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()

    try{
      groupAddRef.child(friendId).set({
        emailUser:req.body.emailFriend,
        join_timestamp:dateToday,
        out_timestamp: "-",
        group_role:"member"
      })

      friendRef.child(req.params.group_id).set({
        nameGroup: req.body.nameGroup
      })

      res.status(200).json({message: "Add member group success"});
    }catch(error){
      res.status(500).json({message: "Error when add member to group"});
    }
  });
})

router.patch('/:group_id', (req,res)=>{
    const updateGroup = {
        name: req.body.name,
        group_pict: req.body.group_pict
    }
    groupRef.child(req.params.group_id).update(updateGroup);
    res.send('success');
})



module.exports = router