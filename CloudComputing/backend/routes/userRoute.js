const express = require('express');
const router = express.Router()
const db = require('../utils/firestore')
const {registerValidation} = require('../validate')
const bcrypt = require('bcrypt');

const userRef = db.ref('/users');

router.post('/',async(req,res) => {
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).json({message:error.details[0].message});

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //taruk di cloud storage untuk profile pict 
  //terus ambil url imagenya
  


  try{
    const user_id = userRef.push().key;

    userRef.child(user_id).set({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      profile_pict: req.body.profile_pict,
      phone_number: req.body.phone_number,
      role: req.body.role
    })
  }catch(error){
    res.status(500).json({message: "Error when store in database"})
  }

  res.status(200).json({message: "Register Berhasil"});
})

router.get('/:user_id', (req,res) =>{
  userRef.on('value', snapshot => {
    const newPost = snapshot.val();
    console.log(newPost)
  })
})

router.post('/:user_id', (req,res) =>{
  //untuk User
  const userDataRef = db.ref('/users/'+req.params.user_id+'/contact')
  // const emailUser = db.ref('/users/'+req.params.user_id).email
  
  //Untuk FriendUser
  let friendId = ''
  let namaUser = ''
  let namaFriend = ''
  userRef.once('value', (snapshot) =>{
    snapshot.forEach((data) => {
      if(data.val().email === req.body.email){
        friendId = data.key
        namaFriend = data.val().name
      }
      if(data.key === req.params.user_id){
        namaUser = data.val().name
      }
    });
      // console.log(emailUser);
    const userFriendRef = db.ref('/users/'+friendId+'/contact')

    //Untuk Chat
    const chatId = db.ref('/chats')


    try{
      const id_chat = userDataRef.push().key;

      //Untuk User
      userDataRef.child(id_chat).set({
        email: namaFriend
      })

      //Untuk FriendUser
      userFriendRef.child(id_chat).set({
        email: namaUser
      })

      //untuk Chat
      chatId.child(id_chat).set({
        name: "new chat"
      })

      res.status(200).json({message: "Register Berhasil"});
    }catch(error){
      res.status(500).json({message: "Error when insert new contact friend"})
    }
  })
})

router.patch('/:user_id', (req,res) =>{
  const updateUser = {
    name: req.body.name,
    profile_pict: req.body.profile_pict
  }
  userRef.child(req.params.user_id).update(updateUser);

  res.send('success');
})

module.exports = router