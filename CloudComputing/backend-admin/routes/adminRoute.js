const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')
const {loginAdminValidation} = require('../validate')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const verify = require('./verifyToken');
const kirimEmail = require('../utils/nodemailer')

const annRef = db.ref('/announcements');
const adminRef = db.ref('/admin');

//login route
router.post('/', async(req,res) =>{
    const {error} = loginAdminValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    var success = 0;
    var id_admin = '';

    try{
        adminRef.once('value', (snapshot) => {
            snapshot.forEach((data) => {
                if(data.val().username === req.body.username && bcrypt.compareSync( req.body.password, data.val().password)){
                    success = success + 1;
                    id_admin = data.key;
                }
            });
    
            if(success == 0) return res.status(401).json({message: "Email atau Password Salah"})
            
            const token = jwt.sign({_id: id_admin, exp:Math.floor(Date.now()/1000)+(60*60)}, process.env.TOKEN_SECRET);
    
            return res.status(200).json({
                message: "Login berhasil",
                id: id_admin,
                token: token,
                username: req.body.username
            })
        });
    }catch(error){
        res.status(500).json({
            message: "Server Error"
        })
    }

})

//get all user
router.get('/users', verify, (req,res)=>{
    const userRef = db.ref('/users')
    let user = []
    try{
        userRef.once('value', snapshot => {
            snapshot.forEach((data) => {
                user = [...user,{
                    id: data.key,
                    name: data.val().name,
                    email: data.val().email,
                    posisi: data.val().posisi,
                    divisi_kerja: data.val().divisi_kerja,
                    profile_pict: data.val().profile_pict,
                    approve: data.val().approve,
                }]
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

router.delete('/users',verify,(req,res) =>{
    const userRef = db.ref('/users/'+req.body.id)

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

router.get('/groups',verify, (req,res)=>{
    const groupRef = db.ref('/groups')

    let group = []
    try{
        groupRef.once('value', snapshot =>{
            snapshot.forEach((data) => {
                group = [...group,{
                    id: data.key,
                    name: data.val().name,
                    created_at: data.val().created_at,
                    group_pict: data.val().group_pict,
                }]
            })

            res.status(200).send({
                message: "Success get All Groups",
                snapshot: group
            })
        })
    }catch(error){
        res.status(500).json({message: "Error when get All Groups"})
    }
})

router.get('/groups/member/:group_id', verify, (req,res)=>{
    const groupMemberRef = db.ref('/groups/'+req.params.group_id+'/users')

    let groupMember = []
    try{
        groupMemberRef.once('value', snapshot =>{
            snapshot.forEach((data) =>{
                groupMember = [...groupMember,{
                    email: data.val().emailUser,
                    group_role: data.val().group_role,
                }]
            })
            
            res.status(200).send({
                message: "Success get all member in specific group",
                snapshot: groupMember
            })
        })
    }catch(error){
        res.status(500).json({message: "Error when get all member in specific group"})
    }
})

router.post('/user/approve', verify, (req,res) =>{

    const userRef = db.ref('/users')

    try{
        userRef.child(req.body.id).update({
            approve: req.body.approve
        });

        userRef.child(req.body.id).once('value',(snapshot)=>{
            kirimEmail(snapshot.child('email').val())
        })

        res.status(200).send({
          message: "Success Approve User"
        });
    }catch(error){
        res.status(500).send({
            message: "Failed approve User"
        })
    }
})

function sebarChat(divKerja,message,timestamp){
    if(divKerja === 'Contact Center'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'Call Center' || data.val().nama_divisi === 'Digital' || data.val().nama_divisi === 'Customer Relation' || data.val().nama_divisi === 'VIP Services'){
                    const dataRef = db.ref('/announcements/'+data.key+'/chat/')
                    const idnya = dataRef.push().key;
                    dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:divKerja})
                }
            })
        })
    } else if(divKerja === 'Customer Experience Excellence'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'Retail Customer Experience' || data.val().nama_divisi === 'Business Process & Training' || data.val().nama_divisi === 'Service Quality & Exp Assurance' || data.val().nama_divisi === 'Customer Journey'){
                    const dataRef = db.ref('/announcements/'+data.key+'/chat/')
                    const idnya = dataRef.push().key;
                    dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:divKerja})
                }
            })
        })
    } else if(divKerja === 'Collection & Billing Mgt'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'Collection & Payment' || data.val().nama_divisi === 'Billing & Administration' || data.val().nama_divisi === 'Verification & Credit Monitoring'){
                    const dataRef = db.ref('/announcements/'+data.key+'/chat/')
                    const idnya = dataRef.push().key;
                    dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:divKerja})
                }
            })
        })
    } else if(divKerja === 'Biz Support & Development'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'Business Planning & Project Tracking' || data.val().nama_divisi === 'Infra Support & Tech Development'){
                    const dataRef = db.ref('/announcements/'+data.key+'/chat/')
                    const idnya = dataRef.push().key;
                    dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:divKerja})
                }
            })
        })
    } else if(divKerja === 'CX Analytics & Insights'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'CX Reporting Team'){
                    const dataRef = db.ref('/announcements/'+data.key+'/chat/')
                    const idnya = dataRef.push().key;
                    dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:divKerja})
                }
            })
        })
    }
}

router.post('/announcement', verify, (req,res)=>{
    //today date
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    const today = mm + '/' + dd + '/' + yyyy

    try{
        annRef.once('value',(snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === req.body.nama_divisi){
                    const annChatRef = db.ref('/announcements/'+data.key+'/chat')
                    const annChatId = annChatRef.push().key;
    
                    const filenya = req.body.message
    
                    annChatRef.child(annChatId).set({
                        message: filenya,
                        timestamp: today,
                        sender: req.body.nama_divisi
                    })
                    sebarChat(req.body.nama_divisi,filenya,today)
        
                    res.status(200).json({message: "Pesan berhasil terkirim"});
                }
            })
        })
    }catch(error){
        res.status(200).json({message: "Pesan berhasil terkirim"});
    }
})

router.post('/chat', (req,res) => {
    const chatRef = db.ref('/admin/chat');
    const chatRefKey = chatRef.push().key;

    //today date
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    const today = mm + '/' + dd + '/' + yyyy;

    chatRef.child(chatRefKey).set({
        sender: req.body.sender,
        message: req.body.message,
        timestamp: today
    })

    res.status(200).send({message: "success"})
})

// router.post('/new', async(req,res) =>{
//     const adminRefKey = adminRef.push().key

//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(req.body.password, salt);

//     adminRef.child(adminRefKey).set({
//         password: hashPassword,
//         username: "IoHAdmin@gmail.com"
//     })
// })

module.exports = router
