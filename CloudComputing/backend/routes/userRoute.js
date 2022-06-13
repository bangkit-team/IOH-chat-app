const express = require('express');
const router = express.Router()
const db = require('../utils/firestore')
const {registerValidation, updateUserValidation} = require('../validate')
const bcrypt = require('bcrypt');
const cstorage = require('../utils/cloudStorage')
const { uploadGambar, uploadApaaja } = require('../utils/multerLibrary')
const fs = require('fs');
const path = require("path");
const verify = require('./verifyToken');
const { time } = require('console');

const userRef = db.ref('/users');

const hurufDict = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

//regis API
router.post('/',async(req,res) => {
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).json({message:error.details[0].message});

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  var success = 0;
  try{
    userRef.once('value', (snapshot) => {
      snapshot.forEach((data) => {
        if(data.val().email === req.body.email){
          success = success + 1;
        }
      })
      if(success != 0){
        return res.status(400).json({
          message:"Email Sudah Terdaftar!",
          code: 2
        })
      }else{
  
        try{
          const user_id = userRef.push().key;
  
          //today date
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); 
          var yyyy = today.getFullYear();
  
          today = mm + '/' + dd + '/' + yyyy;

          //pict depends on name
          let huruf = req.body.name
          huruf = huruf.toLocaleLowerCase()
          ascii = huruf.charCodeAt(0) - 97
          ascii = hurufDict[ascii]
  
          userRef.child(user_id).set({
            about: "Available",
            approve: false,
            divisi_kerja: req.body.divisi_kerja,
            email: req.body.email,
            name: req.body.name,
            password: hashPassword,
            phone_number: req.body.phone_number,
            posisi: req.body.posisi,
            profile_pict: `https://storage.googleapis.com/bangkit_chatapp_bucket/UserPict/default_pict/`+ascii+`.png`,
            timestamp: today,
          })
          res.status(200).json({
            message: "Register Berhasil",
            code: 1
          });
        }catch(error){
          res.status(500).json({
            message: "Error when store in database",
            code: 3
          })
        }
      }
    });
  }catch(e){
    res.status(500).send({
      message: "Internal Server Error",
      code: 0
    })
  }
})

//ambil user profile for setting or profile page
router.get('/:user_id', verify, (req,res)=>{
  const userRef = db.ref('/users/'+req.params.user_id)
  try{
    userRef.once('value', snapshot =>{
      console.log(snapshot);

      res.status(200).send({
        message: "Success get Profile User",
        snapshot
      })
    })
  }catch(error){
    res.status(500).send({message: "Internal Server Error"})
  }
})

//ambil contact friend and group specific user
router.get('/home/:user_id', verify, (req,res) =>{
  const userRefId = db.ref('/users/'+req.params.user_id+'/contact')
  try{
    let userContact = []
    userRefId.once('value', snapshot => {
      snapshot.forEach((data) =>{
        userContact = [...userContact,{
            id_chat: data.val().id_chat,
            name: data.val().name,
            pict: data.val().pict
        }]
      })
      res.status(200).send({
        message: "Success get friend and group",
        snapshot: userContact, 
      });
    })
  }catch(error){
    res.status(500).send({
      message: "Failed get friend and group"
    })
  }
})

//tambah teman private chat
router.post('/:user_id',verify, (req,res) =>{
  //untuk User
  const userDataRef = db.ref('/users/'+req.params.user_id+'/contact')

  //Untuk FriendUser
  var success = 0;
  let friendId = ''
  let dataUser = {}
  let dataFriend = {}

  const date = new Date();
  const timeToday = date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()

  try{
    userRef.once('value', (snapshot) =>{
      snapshot.forEach((data) => {
        if(data.val().email === req.body.email){
          success = success + 1;
          friendId = data.key
          dataFriend = {
            nameFriend: data.val().name,
            emailFriend: data.val().email,
            pict: data.val().profile_pict
          }
        }
        if(data.key === req.params.user_id){
          dataUser = {
            nameUser: data.val().name,
            emailUser: data.val().email,
            pict: data.val().profile_pict
          }
        }
      });
      if(success == 0){
        return res.status(400).send({
          message:"Email yang Dicari Tidak Ada!",
          code: 2
        })
      }else{
        const userFriendRef = db.ref('/users/'+friendId+'/contact')
  
        try{
          const id_chat = userDataRef.push().key+dataUser.nameUser.replace(/ /g, "")+'-'+dataFriend.nameFriend.replace(/ /g, "")+'PC';
          const idChatRef = db.ref('/chats/'+id_chat)
          const idChatKey = idChatRef.push().key
          //Untuk User
          userDataRef.child(id_chat).set({
            id_chat: id_chat,
            name: dataFriend.nameFriend,
            id_friend: friendId,
            pict: dataFriend.pict
          })
  
          //Untuk FriendUser
          userFriendRef.child(id_chat).set({
            id_chat: id_chat,
            name: dataUser.nameUser,
            id_friend: req.params.user_id,
            pict: dataUser.pict
          })

          //untuk chatid
          idChatRef.child(idChatKey).set({
            timestamp: timeToday,
            sender: dataUser.nameUser,
            message: "Pesan Pertama"
          })
  
          res.status(200).json({
            message: "Add Friend Success",
            id_chat: id_chat,
            id_friend: friendId,
            nameFriend: dataFriend.nameFriend,
            code: 1
          });
        }catch(error){
          res.status(500).json({
            message: "Error when insert new contact friend",
            code: 3
          })
        }
      }
    })
  }catch(e){
    res.status(500).send({
      message: "Internal Server Error",
      code: 0
    })
  }
})

// edit user
router.patch('/:user_id',verify, uploadGambar.single('profile_pict'), (req,res) =>{
  const {error} = updateUserValidation(req.body);
  if(error) return res.status(400).json({message:error.details[0].message});

  try{
    async function uploadFile() {
      await cstorage.upload(`../backend/files/${req.file.filename}`,{
          destination: `UserPict/${req.file.filename}`
      });
      await cstorage.file(`UserPict/${req.file.filename}`).makePublic();
      //ngehapus filenya
      const filepath = path.resolve(`./files/${req.file.filename}`);
      fs.unlinkSync(filepath);
    }
    uploadFile().catch(console.error);
  
    //profile_pict diambil bukan dari body
    const updateUser = {
      name: req.body.name,
      phone_number: req.body.phone_number,
      posisi: req.body.posisi,
      divisi_kerja: req.body.divisi_kerja,
      profile_pict: `https://storage.googleapis.com/bangkit_chatapp_bucket/UserPict/${req.file.filename}`,
      about: req.body.about
    }
  
    try{
      //delete pict lama dan update database
      const userIdRef = db.ref('/users/'+req.params.user_id)
      userIdRef.once('value',(snapshot)=>{
        const pictLama = snapshot.child('profile_pict').val().replace("https://storage.googleapis.com/bangkit_chatapp_bucket/UserPict", "UserPict")
        if(!pictLama.includes('UserPict/default_pict')){
          async function deleteFile() {
            await cstorage.file(pictLama).delete();
            userRef.child(req.params.user_id).update(updateUser);
          }
          deleteFile().catch(console.error); 
        }
      })
  
      res.status(200).send({
        message: "Success Edit Profile User"
      });
    }catch(error){
      res.status(500).send({
        message: "Error when update user profile"
      })
    }
  }catch(e){
    res.status(500).send({message: "Internal Server Error"})
  }
})

// delete user
router.delete('/:user_id', verify, (req,res) =>{
  const userRef = db.ref('/users/'+req.params.user_id)

  try{
      userRef.remove();

      res.status(200).send({
        message: "Success Delete User"
      });
  }catch(error){
      res.status(500).send({
          message: "Failed Delete User"
      })
  }
})

//realtime chat PC
router.post('/:user_id/chat/:chat_id',verify, uploadApaaja.single('file'), (req,res) =>{
  const chatPCRef = db.ref('/chats/'+req.params.chat_id)
  const chatPCId = chatPCRef.push().key;

  const date = new Date();
  const timeToday = date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()

  try{
    const userContactRef = db.ref('/users/'+req.params.user_id+'/contact/'+req.params.chat_id)
    userContactRef.once('value', (snapshot) => {
      const emailFriend = snapshot.child('emailFriend').val();
  
      //taruk di cloud storage untuk profile pict 
      async function uploadFile() {
        await cstorage.upload(`../backend/files/${req.file.filename}`,{
          destination: `RoomFile/PersonalChat/${req.params.chat_id}/${req.file.filename}`
        });
  
        await cstorage.file(`RoomFile/PersonalChat/${req.params.chat_id}/${req.file.filename}`).acl.readers.addUser(req.body.sender);
        await cstorage.file(`RoomFile/PersonalChat/${req.params.chat_id}/${req.file.filename}`).acl.readers.addUser(emailFriend);
  
        //ngehapus filenya
        const filepath = path.resolve(`./files/${req.file.filename}`);
        fs.unlinkSync(filepath);
      }
      uploadFile().catch(console.error);
  
      chatPCRef.child(chatPCId).set({
        timestamp:timeToday,
        sender: req.body.sender,
        message: `https://storage.cloud.google.com/bangkit_chatapp_bucket/RoomFile/PersonalChat/${req.params.chat_id}/${req.file.filename}`,
      })
  
      res.status(200).send({
        message: "Success send chat",
      });
      res.status(500).send({
        message: "Error when send file/picture",
      })
    })
  }catch(e){
    res.status(500).send({message: "Internal Server Error"})
  }
})


module.exports = router