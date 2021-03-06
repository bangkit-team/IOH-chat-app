const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')
const {loginValidation} = require('../validate')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userRef = db.ref('/users');

router.post('/',(req, res) =>{
    const {error} = loginValidation(req.body);
    if(error) return res.status(200).send(error.details[0].message)
    
    var success = 0;
    let dataUser = {};
    
    try{
        userRef.once('value', (snapshot) => {
            snapshot.forEach((data) => {
                if(data.val().email === req.body.email && bcrypt.compareSync( req.body.password, data.val().password)){
                    if(data.val().approve === false){
                        success = -1;
                    }else{
                        success = success + 1;
                        dataUser = {
                            id_user: data.key
                        }
                    }
                }
            });
            if(success === 1){
                const token = jwt.sign({_id: dataUser.id_user}, process.env.TOKEN_SECRET);
    
                res.status(200).send({
                    message: 'Login Berhasil',
                    code: 1,
                    token: token,
                    dataUser
                })
            }else if(success === 0){
                res.status(200).send({
                    message: 'Email atau Password salah',
                    code: 2
                })
            }else if(success === -1){
                res.status(200).send({
                    message: 'Akun belum diapprove oleh Admin',
                    code: 3
                })
            }
        })
    }catch(error){
        res.status(500).send({
            message: "Internal Server Error",
            code: 0
        })
    }
})


module.exports = router