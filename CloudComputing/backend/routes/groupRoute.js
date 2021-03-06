const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')
const {updateGroupValidation} = require('../validate')
const cstorage = require('../utils/cloudStorage')
const { uploadGambar, uploadApaaja } = require('../utils/multerLibrary')
const fs = require('fs');
const path = require("path");
const groupRef = db.ref('/groups');
const verify = require('./verifyToken');

//tambah grup baru
router.post('/:user_id/group', verify, uploadGambar.single('group_pict'), (req,res)=>{

  var success = 0;

  try{
    groupRef.once('value', (snapshot) =>{
      snapshot.forEach((data) => {
        if(data.val().name === req.body.name){
          success = success + 1
        }
      })
      if(success != 0){
        res.status(400).send({message: "Nama Grup sudah ada"})
      }else{
        const group_id = groupRef.push().key+req.body.name.replace(/ /g, "")+'Group';
  
        const groupChatRef = db.ref('/groups/'+group_id+'/chat');
        const groupChatId = groupChatRef.push().key;
    
        const userRef = db.ref('/users/'+req.params.user_id+'/contact');
        const groupAddRef = db.ref('/groups/'+group_id+'/users')
    
        //today date
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        const today = mm + '/' + dd + '/' + yyyy;
        const timeToday = date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()
    
        // taruk di cloud storage untuk group pict 
        async function uploadFile() {
          await cstorage.upload(`../backend/files/${req.file.filename}`,{
              destination: `GroupPict/${req.file.filename}`
          });
          await cstorage.file(`GroupPict/${req.file.filename}`).makePublic();
          //ngehapus filenya
          const filepath = path.resolve(`./files/${req.file.filename}`);
          fs.unlinkSync(filepath);
        }
        uploadFile().catch(console.error);
    
        try{
          //tambah group
          groupRef.child(group_id).set({
            name: req.body.name,
            deskripsi: "Available",
            created_at: today,
            group_pict: `https://storage.googleapis.com/bangkit_chatapp_bucket/GroupPict/${req.file.filename}`
          })

          console.log("Test")
    
          //tambah data user yang buat group ke group
          groupAddRef.child(req.params.user_id).set({
            emailUser: req.body.email_user,
            pict: req.body.profile_pict,
            join_timestamp:today,
            group_role:"admin"
          })
      
          console.log("Test2")

          //tambah data group ke user
          userRef.child(group_id).set({
            id_chat: group_id+'/chat',
            id_group: group_id,
            name: req.body.name,
            pict: `https://storage.googleapis.com/bangkit_chatapp_bucket/GroupPict/${req.file.filename}`
          })


          console.log("Test3")
      
          //tambah message kosong ke grup
          groupChatRef.child(groupChatId).set({
            message: "Pesan Awal",
            timestamp: timeToday
          })

          console.log("Test4")
        
          res.status(200).json({
            message: "Add new group success",
            id_group: group_id
          });
        }catch(error){
          res.status(500).json({message: "Error when make a group"})
        }
      }
    });
  }catch(e){
    res.status(500).send({message: "Internal Server Error"})
  }
})

//ambil spesifik group
router.get('/:user_id/group/:group_id', verify, (req,res) =>{
  const groupIdRef = db.ref('/groups/'+req.params.group_id)

  try{
    groupIdRef.once('value', snapshot => {
      res.status(200).send({
        message: "Success get specific group",
        name: snapshot.val().name,
        pict: snapshot.val().group_pict,
        desc: snapshot.val().deskripsi,
        created_at: snapshot.val().created_at,
        member: snapshot.val().users
      });
    })
  }catch(error){
    res.status(500).send({
      message: "Failed get specific group"
    })
  }
})

//tambah teman ke dalam group
router.post('/:user_id/group/:group_id', verify, (req,res)=>{
  const groupAddRef = db.ref('/groups/'+req.params.group_id+'/users');
  const userRef = db.ref('/users')

  var success = 0
  let friendId = ''

  try{
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

        //today date
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        const today = mm + '/' + dd + '/' + yyyy

        try{
          //tambah user baru ke grup
          groupAddRef.child(friendId).set({
            emailUser:req.body.emailFriend,
            pict: req.body.pictFriend,
            join_timestamp:today,
            group_role:"member"
          })

          //masukkan data group ke user
          friendRef.child(req.params.group_id).set({
            id_chat: req.params.group_id+'/chat',
            id_group: req.params.group_id,
            name: req.body.nameGroup,
            pict: req.body.pictGroup
          })

          res.status(200).json({message: `Add ${req.body.emailFriend} to ${req.body.nameGroup} group success`});
        }catch(error){
          res.status(500).json({message: "Error when add member to group"});
        }
      });
    })
  }catch(e){
    res.status(500).send({message: "Internal Servver Error"})
  }
})

//edit profile group
router.patch('/:user_id/group/:group_id', verify, uploadGambar.single('group_pict'), (req,res)=>{
  const {error} = updateGroupValidation(req.body);
  if(error) return res.status(400).json({message:error.details[0].message});

  try{
    //taruk di cloud storage untuk profile pict 
    async function uploadFile() {
      await cstorage.upload(`../backend/files/${req.file.filename}`,{
          destination: `GroupPict/${req.file.filename}`
      });

      await cstorage.file(`GroupPict/${req.file.filename}`).makePublic();
      //ngehapus filenya
      const filepath = path.resolve(`./files/${req.file.filename}`);
      fs.unlinkSync(filepath);
    }
    uploadFile().catch(console.error);

    try{
     //delete pict lama dan update database
      const groupIdRef = db.ref('/groups/'+req.params.group_id)
      groupIdRef.once('value',(snapshot)=>{
        console.log(snapshot.child('group_pict').val())
        const pictLama = snapshot.child('group_pict').val().replace("https://storage.googleapis.com/bangkit_chatapp_bucket/GroupPict", "GroupPict")
        async function deleteFile() {
          await cstorage.file(pictLama).delete();
          groupRef.child(req.params.group_id).update(updateGroup);
        }
        deleteFile().catch(console.error);
      })

      res.status(200).send({
        message: "Success Edit Profile Group"
      });
    }catch(error){
      res.status(500).send({message: "Error when edit group profile"})
    }
  }catch(e){
    res.status(500).send({message: "Internal Server Error"})
  }
})

//Specific User out from group
router.delete('/:user_id/group/:group_id', verify, (req,res)=>{
  try{
    const groupUserRef = db.ref('/groups/'+req.params.group_id+'/users/'+req.body.user_id)
    groupUserRef.remove();
  
    const userRef = db.ref('/users/'+req.body.user_id+'/contact/'+req.params.group_id)
    userRef.remove();

    return res.status(200).json({message: "Success Delete User from Group"})
  }catch(error){
    return res.status(500).json({message: "Failed Delete User from Group"})
  }
})

//realtime chat group by id
router.post('/:user_id/group/:group_id/chat', verify, uploadApaaja.single('file'), (req,res)=>{
  const chatGroupRef = db.ref('/groups/'+req.params.group_id+'/chat')
  const chatGroupId = chatGroupRef.push().key;

  const date = new Date();
  const timeToday = date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()

  try{
    //taruk di cloud storage untuk profile pict 
    async function uploadFile() {
      await cstorage.upload(`../backend/files/${req.file.filename}`,{
        destination: `RoomFile/Group/${req.params.group_id}/${req.file.filename}`
      });

      let userEmail = []
      const groupChatRef = db.ref('/groups/'+req.params.group_id+"/users")
      groupChatRef.once('value', async (snapshot) =>{
        snapshot.forEach((data) =>{
          userEmail.push(data.val().emailUser)
        })
        for(let i=0; i < userEmail.length; i++){
          await cstorage.file(`RoomFile/Group/${req.params.group_id}/${req.file.filename}`).acl.readers.addUser(userEmail[i]);
        }
      })

      //ngehapus filenya
      const filepath = path.resolve(`./files/${req.file.filename}`);
      fs.unlinkSync(filepath);
    }
    uploadFile().catch(console.error);

    chatGroupRef.child(chatGroupId).set({
      timestamp:timeToday,
      sender: req.body.sender,
      message: `https://storage.cloud.google.com/bangkit_chatapp_bucket/RoomFile/Group/${req.params.group_id}/${req.file.filename}`,
    })

    res.status(200).send({
      message: "Success send chat",
    });
  }catch(error){
    res.status(500).send({
      message: "Error when send file/picture",
    })
  }
})


module.exports = router