const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')

const groupRef = db.ref('/groups');

router.post('/',(req,res)=>{
    const group_id = groupRef.push().key;

    groupRef.child(group_id).set({
      name: req.body.name,
      group_pict: req.body.group_pict,
      users:{
        phone_number:req.body.phone_number,
        join_timestamp:"test",
        out_timestamp: "null",
        group_role:"admin"
      }
      ,
      messages:[],
      created_at: "test"
    })
  
    res.send('success');
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