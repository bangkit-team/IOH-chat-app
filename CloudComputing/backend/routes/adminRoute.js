const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')
const {loginAdminValidation} = require('../validate')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const verify = require('./verifyToken');

const adminRef = db.ref('/admin')

//login route
router.post('/', async(req,res) =>{
    const {error} = loginAdminValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    var success = 0;
    var id_admin = '';
    adminRef.once('value', (snapshot) => {
        snapshot.forEach((data) => {
            if(data.val().username === req.body.username && bcrypt.compareSync( req.body.password, data.val().password)){
                success = success + 1;
                id_admin = data.key;
            }
        });

        if(success == 0) return res.status(400).json({message: "Email atau Password Salah"})
        
        const token = jwt.sign({_id: id_admin, exp:Math.floor(Date.now()/1000)+(60*60)}, process.env.TOKEN_SECRET);

        return res.status(200).json({
            message: "Login berhasil",
            _id: id_admin,
            token: token,
        })
    });

})

//get all user
router.get('/users',verify, (req,res)=>{
    const userRef = db.ref('/users')

    let user = []
    try{
        userRef.once('value', snapshot => {
            snapshot.forEach((data) => {
                user.push([data.val().name,data.val().email,data.val().profile_pict])
            })
            res.status(200).send({
                message: "Success get All Users",
                snapshot: user 
            })
        })
    }catch(error){
        res.status(500).json({message: "Error when get All Users"})
    }
})

router.get('/groups',verify, (req,res)=>{
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