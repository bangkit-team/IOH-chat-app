const express = require('express');
const router = express.Router()
const db = require('../utils/firestore')
const {registerValidation, updateUserValidation} = require('../validate')
const bcrypt = require('bcrypt');
const cstorage = require('../utils/cloudStorage')
const { uploadGambar, uploadApaaja } = require('../utils/multerLibrary')
const fs = require('fs');
const path = require("path");

const userRef = db.ref('/users');

//regis API
router.post('/', uploadGambar.single('profile_pict'),async(req,res) => {
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).json({message:error.details[0].message});

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  var success = 0;
  userRef.once('value', (snapshot) => {
    snapshot.forEach((data) => {
      if(data.val().email === req.body.email){
        success = success + 1;
      }
    })
    if(success != 0){
      res.status(400).json({message:"Email Sudah Terdaftar!"})
    }else{
      //taruk di cloud storage untuk profile pict 
      async function uploadFile() {
        await cstorage.upload(`../backend/files/${req.file.filename}`,{
            destination: `UserPict/${req.file.filename}`
        });
        //ngehapus filenya
        const filepath = path.resolve(`./files/${req.file.filename}`);
        console.log('File path ::', filepath);
        fs.unlinkSync(filepath);
      }
      uploadFile().catch(console.error);

      try{
        const user_id = userRef.push().key;

        userRef.child(user_id).set({
          name: req.body.name,
          tanggal_lahir: req.body.tanggal_lahir,
          posisi: req.body.posisi,
          divisi_kerja: req.body.divisi_kerja,
          email: req.body.email,
          password: hashPassword,
          profile_pict: `https://storage.googleapis.com/bangkit_chatapp_bucket/UserPict/${req.file.filename}`,
          phone_number: req.body.phone_number,
          about: "Available"
        })
        res.status(200).json({message: "Register Berhasil"});
      }catch(error){
        res.status(500).json({message: "Error when store in database"})
      }
    }
  });
})

//ambil semua data untuk specific user
router.get('/:user_id', (req,res) =>{
  const userRefId = db.ref('/users/'+req.params.user_id)
  try{
    userRefId.once('value', snapshot => {
      res.status(200).send({
        message: "Success get friend and group",
        snapshot 
      });
    })
  }catch(error){
    res.status(500).send({
      message: "Failed get friend and group"
    })
  }
})

//tambah teman private chat
router.post('/:user_id', uploadApaaja.single('file'), (req,res) =>{
  //untuk User
  const userDataRef = db.ref('/users/'+req.params.user_id+'/contact')
  // const emailUser = db.ref('/users/'+req.params.user_id).email
  
  //Untuk FriendUser
  var success = 0;
  let friendId = ''
  let dataUser = {}
  let dataFriend = {}
  userRef.once('value', (snapshot) =>{
    snapshot.forEach((data) => {
      if(data.val().email === req.body.email){
        success = success + 1;
        friendId = data.key
        dataFriend = {
          nameFriend: data.val().name,
          emailFriend: data.val().email
        }
      }
      if(data.key === req.params.user_id){
        dataUser = {
          nameUser: data.val().name,
          emailUser: data.val().email,
          posisiUser: data.val().posisi
        }
      }
    });
    if(success == 0){
      res.status(400).send({message:"Email yang Dicari Tidak Ada!"})
    }else{
      // console.log(emailUser);
      const userFriendRef = db.ref('/users/'+friendId+'/contact')

      const date = new Date()
      const timeToday = date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()

      try{
        const id_chat = userDataRef.push().key+dataUser.nameUser+'-'+dataFriend.nameFriend+'PC';
        const chatIdRef = db.ref('/chats/'+id_chat);
        const id_per_chat = chatIdRef.push().key;

        //taruk di cloud storage untuk profile pict 
        async function uploadFile() {
          await cstorage.upload(`../backend/files/${req.file.filename}`,{
            destination: `RoomFile/PersonalChat/${id_chat}/${req.file.filename}`
          });
          //ngehapus filenya
          const filepath = path.resolve(`./files/${req.file.filename}`);
          console.log('File path ::', filepath);
          console.log(req.file);
          fs.unlinkSync(filepath);
        }
        uploadFile().catch(console.error);

        //Untuk User
        userDataRef.child(id_chat).set({
          id_chat: id_chat,
          nameFriend: dataFriend.nameFriend,
          emailFriend: dataFriend.emailFriend
        })

        //Untuk FriendUser
        userFriendRef.child(id_chat).set({
          id_chat: id_chat,
          namaFriend: dataUser.nameUser,
          emailFriend: dataUser.emailUser
        })

        //untuk Chat
        chatIdRef.child(id_per_chat).set({
          message: req.body.message,
          timestamp: timeToday,
          sender: dataUser.emailUser,
          file: `https://storage.googleapis.com/bangkit_chatapp_bucket/RoomFile/PersonalChat/${id_chat}/${req.file.filename}`
        })

        res.status(200).json({
          message: "Register Berhasil",
          id_chat: id_chat
        });
      }catch(error){
        res.status(500).json({message: "Error when insert new contact friend"})
      }
    }
  })
})

// edit user
router.patch('/:user_id', (req,res) =>{
  const {error} = updateUserValidation(req.body);
  if(error) return res.status(400).json({message:error.details[0].message});

  //profile_pict diambil bukan dari body
  const updateUser = {
    name: req.body.name,
    phone_number: req.body.phone_number,
    tanggal_lahir: req.body.tanggal_lahir,
    posisi: req.body.posisi,
    divisi_kerja: req.body.divisi_kerja,
    // profile_pict: req.body.profile_pict,
    about: req.body.about
  }

  try{
    userRef.child(req.params.user_id).update(updateUser);

    res.status(200).send({
      message: "Success Edit Profile User"
    });
  }catch(error){
    res.status(500).send({
      message: "Error when update user profile"
    })
  }
})

//realtime chat PC
router.post('/:user_id/chat/:chat_id', (req,res) =>{
  const chatPCRef = db.ref('/chats/'+req.params.chat_id)
  const chatPCId = chatPCRef.push().key;

  const date = new Date();
  const timeToday = date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()

  try{
    //tambah user baru ke grup
    chatPCRef.child(chatPCId).set({
      message:req.body.message,
      timestamp:timeToday,
      sender: req.body.sender
    })

    res.status(200).send({
      message: "Success send chat"
    });
  }catch(error){
    res.status(500).send({message: "Error when send chat"})
  }
})


module.exports = router