const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')

const userRef = db.ref('/users');

router.post('/',(req,res) => {
  const user_id = userRef.push().key;

  userRef.child(user_id).set({
    name: req.body.name,
    profile_pict: req.body.profile_pict,
    phone_number: req.body.phone_number,
    data:[],
    is_online: true
  })

  res.send('success');
})

router.get('/:user_id', (req,res) =>{
  userRef.on('value', snapshot => {
    const newPost = snapshot.val();
    console.log(newPost)
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

// userRef.on('child_changed', snapshot => {
//   console.log('test')
// })

// userRef.on('child_removed', snapshot => {
//   console.log('test')
// })