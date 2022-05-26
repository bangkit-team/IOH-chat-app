const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')
const cstorage = require('../utils/cloudStorage')
const { uploadApaaja } = require('../utils/multerLibrary')
const fs = require('fs');
const path = require("path");
//const announcementRef = db.ref('/announcements');

function hapusPosisi(user,posisi){
    if(posisi === 'Contact Center'){
        const dataRef = db.ref('/announcements/Call Center/users/'+user)
        const dataRef1 = db.ref('/announcements/Digital/users/'+user)
        const dataRef2 = db.ref('/announcements/Customer Relation/users/'+user)
        const dataRef3 = db.ref('/announcements/VIP Services/users/'+user)
        dataRef.remove();
        dataRef1.remove();
        dataRef2.remove();
        dataRef3.remove();
    } else if(posisi === 'Customer Experience Excellence'){
        const dataRef = db.ref('/announcements/Gerai/users/'+user)
        const dataRef1 = db.ref('/announcements/BPT/users/'+user)
        const dataRef2 = db.ref('/announcements/SQEA/users/'+user)
        const dataRef3 = db.ref('/announcements/CJ/users/'+user)
        dataRef.remove();
        dataRef1.remove();
        dataRef2.remove();
        dataRef3.remove();
    } else if(posisi === 'Collection Billing Mgt'){
        const dataRef = db.ref('/announcements/CP/users/'+user)
        const dataRef1 = db.ref('/announcements/BA/users/'+user)
        const dataRef2 = db.ref('/announcements/VCM/users/'+user)
        dataRef.remove();
        dataRef1.remove();
        dataRef2.remove();
    } else if(posisi === 'Biz Support Development'){
        const dataRef = db.ref('/announcements/BPPT/users/'+user)
        const dataRef1 = db.ref('/announcements/ISTD/users/'+user)
        dataRef.remove();
        dataRef1.remove();
    } else if(posisi === 'CX Analytics Insights'){
        const dataRef = db.ref('/announcements/CX Report/users/'+user)
        dataRef.remove();
    }
}

function tambahPosisi(user,posisi,email,timestamp){
    if(posisi === 'Contact Center'){
        const dataRef = db.ref('/announcements/Call Center/users/')
        const dataRef1 = db.ref('/announcements/Digital/users/')
        const dataRef2 = db.ref('/announcements/Customer Relation/users/')
        const dataRef3 = db.ref('/announcements/VIP Services/users/')
        dataRef.child(user).set({emailUser: email,join_timestamp:timestamp})
        dataRef1.child(user).set({emailUser: email,join_timestamp:timestamp})
        dataRef2.child(user).set({emailUser: email,join_timestamp:timestamp})
        dataRef3.child(user).set({emailUser: email,join_timestamp:timestamp})
    } else if(posisi === 'Customer Experience Excellence'){
        const dataRef = db.ref('/announcements/Gerai/users/')
        const dataRef1 = db.ref('/announcements/BPT/users/')
        const dataRef2 = db.ref('/announcements/SQEA/users/')
        const dataRef3 = db.ref('/announcements/CJ/users/')
        dataRef.child(user).set({emailUser: email,join_timestamp:timestamp})
        dataRef1.child(user).set({emailUser: email,join_timestamp:timestamp})
        dataRef2.child(user).set({emailUser: email,join_timestamp:timestamp})
        dataRef3.child(user).set({emailUser: email,join_timestamp:timestamp})
    } else if(posisi === 'Collection Billing Mgt'){
        const dataRef = db.ref('/announcements/CP/users/')
        const dataRef1 = db.ref('/announcements/BA/users/')
        const dataRef2 = db.ref('/announcements/VCM/users/')
        dataRef.child(user).set({emailUser: email,join_timestamp:timestamp})
        dataRef1.child(user).set({emailUser: email,join_timestamp:timestamp})
        dataRef2.child(user).set({emailUser: email,join_timestamp:timestamp})
    } else if(posisi === 'Biz Support Development'){
        const dataRef = db.ref('/announcements/BPPT/users/')
        const dataRef1 = db.ref('/announcements/ISTD/users/')
        dataRef.child(user).set({emailUser: email,join_timestamp:timestamp})
        dataRef1.child(user).set({emailUser: email,join_timestamp:timestamp})
    } else if(posisi === 'CX Analytics Insights'){
        const dataRef = db.ref('/announcements/CX Report/users/')
        dataRef.child(user).set({emailUser: email,join_timestamp:timestamp})
    }
}

function sebarChatTanpaFile(posisi,message,timestamp){
    if(posisi === 'Contact Center'){
        const dataRef = db.ref('/announcements/Call Center/chat/')
        const dataRef1 = db.ref('/announcements/Digital/chat/')
        const dataRef2 = db.ref('/announcements/Customer Relation/chat/')
        const dataRef3 = db.ref('/announcements/VIP Services/chat/')
        const idnya = dataRef.push().key;
        const idnya1 = dataRef.push().key;
        const idnya2 = dataRef.push().key;
        const idnya3 = dataRef.push().key;
        dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:posisi})
        dataRef1.child(idnya1).set({message: message,timestamp:timestamp,sender:posisi})
        dataRef2.child(idnya2).set({message: message,timestamp:timestamp,sender:posisi})
        dataRef3.child(idnya3).set({message: message,timestamp:timestamp,sender:posisi})
    } else if(posisi === 'Customer Experience Excellence'){
        const dataRef = db.ref('/announcements/Gerai/chat/')
        const dataRef1 = db.ref('/announcements/BPT/chat/')
        const dataRef2 = db.ref('/announcements/SQEA/chat/')
        const dataRef3 = db.ref('/announcements/CJ/chat/')
        const idnya = dataRef.push().key;
        const idnya1 = dataRef.push().key;
        const idnya2 = dataRef.push().key;
        const idnya3 = dataRef.push().key;
        dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:posisi})
        dataRef1.child(idnya1).set({message: message,timestamp:timestamp,sender:posisi})
        dataRef2.child(idnya2).set({message: message,timestamp:timestamp,sender:posisi})
        dataRef3.child(idnya3).set({message: message,timestamp:timestamp,sender:posisi})
    } else if(posisi === 'Collection Billing Mgt'){
        const dataRef = db.ref('/announcements/CP/chat/')
        const dataRef1 = db.ref('/announcements/BA/chat/')
        const dataRef2 = db.ref('/announcements/VCM/chat/')
        const idnya = dataRef.push().key;
        const idnya1 = dataRef.push().key;
        const idnya2 = dataRef.push().key;
        dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:posisi})
        dataRef1.child(idnya1).set({message: message,timestamp:timestamp,sender:posisi})
        dataRef2.child(idnya2).set({message: message,timestamp:timestamp,sender:posisi})
    } else if(posisi === 'Biz Support Development'){
        const dataRef = db.ref('/announcements/BPPT/chat/')
        const dataRef1 = db.ref('/announcements/ISTD/chat/')
        const idnya = dataRef.push().key;
        const idnya1 = dataRef.push().key;
        dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:posisi})
        dataRef1.child(idnya1).set({message: message,timestamp:timestamp,sender:posisi})
    } else if(posisi === 'CX Analytics Insights'){
        const dataRef = db.ref('/announcements/CX Report/chat/')
        const idnya = dataRef.push().key;
        dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:posisi})
    }
}

function sebarChatFile(posisi,message,timestamp,file){
    if(posisi === 'Contact Center'){
        const dataRef = db.ref('/announcements/Call Center/chat/')
        const dataRef1 = db.ref('/announcements/Digital/chat/')
        const dataRef2 = db.ref('/announcements/Customer Relation/chat/')
        const dataRef3 = db.ref('/announcements/VIP Services/chat/')
        const idnya = dataRef.push().key;
        const idnya1 = dataRef.push().key;
        const idnya2 = dataRef.push().key;
        const idnya3 = dataRef.push().key;
        dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:posisi,file:file})
        dataRef1.child(idnya1).set({message: message,timestamp:timestamp,sender:posisi,file:file})
        dataRef2.child(idnya2).set({message: message,timestamp:timestamp,sender:posisi,file:file})
        dataRef3.child(idnya3).set({message: message,timestamp:timestamp,sender:posisi,file:file})
    } else if(posisi === 'Customer Experience Excellence'){
        const dataRef = db.ref('/announcements/Gerai/chat/')
        const dataRef1 = db.ref('/announcements/BPT/chat/')
        const dataRef2 = db.ref('/announcements/SQEA/chat/')
        const dataRef3 = db.ref('/announcements/CJ/chat/')
        const idnya = dataRef.push().key;
        const idnya1 = dataRef.push().key;
        const idnya2 = dataRef.push().key;
        const idnya3 = dataRef.push().key;
        dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:posisi,file:file})
        dataRef1.child(idnya1).set({message: message,timestamp:timestamp,sender:posisi,file:file})
        dataRef2.child(idnya2).set({message: message,timestamp:timestamp,sender:posisi,file:file})
        dataRef3.child(idnya3).set({message: message,timestamp:timestamp,sender:posisi,file:file})
    } else if(posisi === 'Collection Billing Mgt'){
        const dataRef = db.ref('/announcements/CP/chat/')
        const dataRef1 = db.ref('/announcements/BA/chat/')
        const dataRef2 = db.ref('/announcements/VCM/chat/')
        const idnya = dataRef.push().key;
        const idnya1 = dataRef.push().key;
        const idnya2 = dataRef.push().key;
        dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:posisi,file:file})
        dataRef1.child(idnya1).set({message: message,timestamp:timestamp,sender:posisi,file:file})
        dataRef2.child(idnya2).set({message: message,timestamp:timestamp,sender:posisi,file:file})
    } else if(posisi === 'Biz Support Development'){
        const dataRef = db.ref('/announcements/BPPT/chat/')
        const dataRef1 = db.ref('/announcements/ISTD/chat/')
        const idnya = dataRef.push().key;
        const idnya1 = dataRef.push().key;
        dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:posisi,file:file})
        dataRef1.child(idnya1).set({message: message,timestamp:timestamp,sender:posisi,file:file})
    } else if(posisi === 'CX Analytics Insights'){
        const dataRef = db.ref('/announcements/CX Report/chat/')
        const idnya = dataRef.push().key;
        dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:posisi,file:file})
    }
}

//masukkin user ke announc nya dan hapus di announc yg sblmnya klo ada
router.post('/:user_id/announcement', (req,res)=>{
    const date = new Date();
    const dateToday = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()

    if(req.body.posisiSebelum){
        const dataRef = db.ref('/announcements/'+req.body.posisiSebelum+'/users/'+req.params.user_id)
        dataRef.remove();
        hapusPosisi(req.params.user_id,req.body.posisiSebelum);
    }

    const userDataRef = db.ref('/users/'+req.params.user_id)
    userDataRef.once('value',(snapshot)=>{
        var emailUser = snapshot.child('email').val();
        var posisiUser = snapshot.child('posisi').val();

        //tambah user ke announcement
        try{
            const usersRef = db.ref('/announcements/'+posisiUser+'/users')
            usersRef.child(req.params.user_id).set({
                emailUser: emailUser,
                join_timestamp:dateToday
            })

            tambahPosisi(req.params.user_id,posisiUser,emailUser,dateToday)

            res.status(200).json({
                message: "Berhasil menambahkan user ke announcement "+posisiUser
            })
        } catch(error){
            res.status(500).json({message: "Terjadi error"})
        }
    })
})

//kirim pesan
router.post('/:user_id/announcement/:posisi', uploadApaaja.single('file'), (req,res)=>{
    const date = new Date();
    const timeToday = date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()

    const annChatRef = db.ref('/announcements/'+req.params.posisi+'/chat')
    const annChatId = annChatRef.push().key;

    try{
        try{
            console.log(req.file.filename) 
            async function uploadFile() {
                await cstorage.upload(`../backend/files/${req.file.filename}`,{
                    destination: `Announcement/${req.params.posisi}/${req.file.filename}`
                });
                const filepath = path.resolve(`./files/${req.file.filename}`);
                fs.unlinkSync(filepath);
            }
            uploadFile().catch(console.error);
            const filenya = `https://storage.googleapis.com/bangkit_chatapp_bucket/Announcement/${req.params.posisi}/${req.file.filename}`
            annChatRef.child(annChatId).set({
                message: req.body.message,
                timestamp: timeToday,
                sender: req.params.posisi,
                file: filenya
            })
            sebarChatFile(req.params.posisi,req.body.message,timeToday,filenya)
        } catch(error){
            annChatRef.child(annChatId).set({
                message: req.body.message,
                timestamp: timeToday,
                sender: req.params.posisi
            })
            sebarChatTanpaFile(req.params.posisi,req.body.message,timeToday)
        }

        res.status(200).json({message: "Pesan berhasil terkirim"});
    } catch(error){
        res.status(500).json({message: "Error when send a chat"})
    }
})

//dapetin chat announce nya sesuai posisi
/*router.get('/:user_id/announcement', (req,res) => {
    const userDataRef = db.ref('/users/'+req.params.user_id)
    userDataRef.once('value',(snapshot)=>{
        var posisiUser = snapshot.child('posisi').val();
        try{
            const annRef = db.ref('/announcements/'+posisiUser+'/chat')
            annRef.once('value',(chatnya)=>{
                res.status(200).send({chatnya})
            })
        } catch(error){
            res.status(500).send({
                message: "Gagal mendapatkan chat"
            })
        }
    })
})*/

module.exports = router