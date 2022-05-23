const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')
const {loginAdminValidation} = require('../validate')
const bcrypt = require('bcrypt');

const adminRef = db.ref('/admin')

//login route
router.post('/', async(req,res) =>{
    const {error} = loginAdminValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    var success = 0;
    adminRef.once('value', (snapshot) => {
        snapshot.forEach((data) => {
            if(data.val().username === req.body.username && bcrypt.compareSync( req.body.password, data.val().password)){
                success = success + 1;
            }
        });

        if(success == 0) return res.status(400).json({message: "Email atau Password Salah"})
        
        return res.status(200).json({
            message: "Login berhasil"
        })
    });

})

//get all user
router.get('/users', (req,res)=>{
    const userRef = db.ref('/users')

    try{
        userRef.once('value', snapshot => {
            res.status(200).send({
                message: "Success get All Users",
                snapshot
            })
        })
    }catch(error){
        res.status(500).json({message: "Error when get All Users"})
    }
})

router.get('/groups', (req,res)=>{
    const groupRef = db.ref('/groups')

    try{
        groupRef.once('value', snapshot =>{
            res.status(200).send({
                message: "Success get All Groups",
                snapshot
            })
        })
    }catch(error){
        res.status(500).json({message: "Error when get All Users"})
    }
})


//get all group


module.exports = router

//regis admin API nya dimatikan untuk keamanan
// router.post('/', async(req,res)=>{
//     const adminKey = adminRef.push().key;

//     const {error} = loginAdminValidation(req.body);
//     if(error) return res.status(400).json({message:error.details[0].message});

//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(req.body.password, salt);

//     try{
//         adminRef.child(adminKey).set({
//             username: req.body.username,
//             password: hashPassword
//         })
//         res.status(200).json({message: "Register Berhasil"});
//     }catch(error){
//         res.status(500).json({message: "Error when store in database"})
//     }
// })