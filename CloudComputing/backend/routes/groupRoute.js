const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')
const {updateGroupValidation} = require('../validate')
const cstorage = require('../utils/cloudStorage')
const { uploadGambar, uploadApaaja } = require('../utils/multerLibrary')
const fs = require('fs');
const path = require("path");
const groupRef = db.ref('/groups');

//tambah grup baru
router.post('/',(req,res)=>{

  var success = 0;
  groupRef.once('value', (snapshot) =>{
    snapshot.forEach((data) => {
      if(data.val().name === req.body.name){
        success = success + 1
      }
    })
    if(success != 0){
      res.status(400).send({message: "Nama Grup sudah ada"})
    }else{
      const group_id = groupRef.push().key+req.body.name+'Group';
      // const id_chat = chatRef.push().key+req.body.name+'Group';
  
      // const newChatRef = db.ref('/chats/'+id_chat);
      const groupChatRef = db.ref('/groups/'+group_id+'/chat');
      const groupChatId = groupChatRef.push().key;
  
      const userRef = db.ref('/users/'+req.body.id_user+'/contact');
      const groupAddRef = db.ref('/groups/'+group_id+'/users')
  
      //today date
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;
      const timeToday = date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()
  
  
      try{
        //tambah group
        groupRef.child(group_id).set({
          name: req.body.name,
          deskripsi: "Available",
          created_at: today
        })
  
        //tambah data user yang buat group ke group
        groupAddRef.child(req.body.id_user).set({
          emailUser: req.body.email_user,
          join_timestamp:dateToday,
          group_role:"admin"
        })
    
        //tambah data group ke user
        userRef.child(group_id).set({
          id_group: group_id,
          nameGroup: req.body.name
        })
    
        //tambah message kosong ke grup
        groupChatRef.child(groupChatId).set({
          message: "aku gila",
          timestamp: timeToday
        })
      
        res.status(200).json({
          message: "Add new group success",
          id_group: group_id
        });
      }catch(error){
        res.status(500).json({message: "Error when make a group"})
      }
    }
  });
})

router.get('/:group_id', (req,res) =>{
  const groupIdRef = db.ref('/groups/'+req.params.group_id)

  try{
    groupIdRef.once('value', snapshot => {
      res.status(200).send({
        message: "Success get specific group",
        snapshot 
      });
    })
  }catch(error){
    res.status(500).send({
      message: "Failed get specific group"
    })
  }
})

//tambah teman ke dalam group
router.post('/:group_id', (req,res)=>{
  const groupAddRef = db.ref('/groups/'+req.params.group_id+'/users');
  const userRef = db.ref('/users')

  var success = 0
  let friendId = ''

  //check apakah user sudah ada di grup
  groupAddRef.once('value', (snapshot) =>{
    snapshot.forEach((data) =>{
      if(data.val().emailUser === req.body.emailFriend){
        success = success + 1;
      }
    })
    if(success == 1) return res.status(400).json({message: "User sudah ada didalam Group!"})

    var success1 = 0
    userRef.once('value', (snapshot) =>{
      snapshot.forEach((data) => {
        if(data.val().email === req.body.emailFriend){
            success1 = success1 + 1
            friendId = data.key
        }
      });
      if(success1 == 0) return res.status(400).json({message: "User Uknown!"})

      const friendRef = db.ref('/users/'+friendId+'/contact');
      const date = new Date();
      const dateToday = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()
  
      try{
        //tambah user baru ke grup
        groupAddRef.child(friendId).set({
          emailUser:req.body.emailFriend,
          join_timestamp:dateToday,
          group_role:"member"
        })
  
        //masukkan data group ke user
        friendRef.child(req.params.group_id).set({
          id_group: req.params.group_id,
          nameGroup: req.body.nameGroup
        })
  
        res.status(200).json({message: `Add ${req.body.emailFriend} to ${req.body.nameGroup} group success`});
      }catch(error){
        res.status(500).json({message: "Error when add member to group"});
      }
    });
  })
})

//edit profile group
router.patch('/:group_id', uploadGambar.single('group_pict'), (req,res)=>{
  const {error} = updateGroupValidation(req.body);
  if(error) return res.status(400).json({message:error.details[0].message});
  
  //taruk di cloud storage untuk profile pict 
  async function uploadFile() {
    await cstorage.upload(`../backend/files/${req.file.filename}`,{
        destination: `GroupPict/${req.file.filename}`
    });
    //ngehapus filenya
    const filepath = path.resolve(`./files/${req.file.filename}`);
    console.log('File path ::', filepath);
    fs.unlinkSync(filepath);
  }
  uploadFile().catch(console.error);
  
  try{
    const updateGroup = {
      name: req.body.name,
      group_pict: `https://storage.googleapis.com/bangkit_chatapp_bucket/GroupPict/${req.file.filename}`,
      deskripsi: req.body.deskripsi
    }
    groupRef.child(req.params.group_id).update(updateGroup);
    res.status(200).send({
      message: "Success Edit Profile Group"
    });
  }catch(error){
    res.status(500).send({message: "Error when edit group profile"})
  }
})

//Specific User out from group
router.delete('/:group_id', (req,res)=>{
  try{
    const groupUserRef = db.ref('/groups/'+req.params.group_id+'/users/'+req.body.id_agent)
    groupUserRef.remove();
  
    const userRef = db.ref('/users/'+req.body.id_agent+'/contact/'+req.params.group_id)
    userRef.remove();

    return res.status(200).json({message: "Success Delete User from Group"})
  }catch(error){
    return res.status(500).json({message: "Failed Delete User from Group"})
  }
})

//realtime chat group by id
router.post('/:group_id/chat', uploadApaaja.single('file'), (req,res)=>{
  const chatGroupRef = db.ref('/groups/'+req.params.group_id+'/chat')
  const chatGroupId = chatGroupRef.push().key;

  const date = new Date();
  const timeToday = date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()

  try{
    //tambah chat baru ke grup
    try{
      console.log(req.file.filename)
      //taruk di cloud storage untuk profile pict 
      async function uploadFile() {
        await cstorage.upload(`../backend/files/${req.file.filename}`,{
            destination: `RoomFile/Group/${req.params.group_id}/${req.file.filename}`
        });
        //ngehapus filenya
        const filepath = path.resolve(`./files/${req.file.filename}`);
        console.log('File path ::', filepath);
        console.log(req.file);
        fs.unlinkSync(filepath);
      }
      uploadFile().catch(console.error);
      chatGroupRef.child(chatGroupId).set({
        message:req.body.message,
        timestamp:timeToday,
        sender: req.body.sender,
        file: `https://storage.googleapis.com/bangkit_chatapp_bucket/RoomFile/Group/${req.params.group_id}/${req.file.filename}`
      })
    } catch(error){
      chatGroupRef.child(chatGroupId).set({
        message:req.body.message,
        timestamp:timeToday,
        sender: req.body.sender
      })
    }

    res.status(200).send({
      message: "Success send chat"
    });
  }catch(error){
    res.status(500).send({message: "Error when send chat"})
  }

})


module.exports = router