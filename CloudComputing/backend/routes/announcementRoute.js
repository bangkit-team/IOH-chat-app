const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')
const cstorage = require('../utils/cloudStorage')
const { uploadApaaja } = require('../utils/multerLibrary')
const fs = require('fs');
const path = require("path");
const annRef = db.ref('/announcements')

/*
Catatan

Sistem announcementnya:
- kalo yg warna biru ngasih announcement, dirinya dan anak"nya dapet juga
- kalo yg selain warna biru ngasih announcement, dirinya aja yg dapet

Menambah announcement brdsrkan divisi user_idnya, klo udah ada nggk buat:
localhost:3000/user/:user_id/announcement

Kirim pesan:
localhost:3000/user/:user_id/announcement/:div_id
- Request body : message/file
*/

function tambahDivKerja(divKerja){
    try{
        if(divKerja === 'Contact Center'){
            annRef.once('value', (snapshot)=>{
                let anakDivisi = ['Call Center','Digital','Customer Relation','VIP Services']
                snapshot.forEach((data)=>{
                    if(data.val().nama_divisi === 'Call Center' || data.val().nama_divisi === 'Digital' || data.val().nama_divisi === 'Customer Relation' || data.val().nama_divisi === 'VIP Services'){
                        const findDivisi = anakDivisi.indexOf(data.val().nama_divisi)
                        console.log('findDivisi '+findDivisi)
                        anakDivisi.splice(findDivisi,1)
                    }
                    console.log('anakDivisi '+anakDivisi)
                })
                console.log('anakDivisi '+anakDivisi)
                for(let i=0; i<anakDivisi.length; i++) {
                    const idDivBaru = annRef.push().key+anakDivisi[i].replace(/ |&/gi, "");
                    annRef.child(idDivBaru).set({
                        nama_divisi: anakDivisi[i]
                    })
                }
            })
        } else if(divKerja === 'Customer Experience Excellence'){
            annRef.once('value', (snapshot)=>{
                let anakDivisi = ['Retail Customer Experience','Business Process & Training','Service Quality & Exp Assurance','Customer Journey'];
                snapshot.forEach((data)=>{
                    if(data.val().nama_divisi === 'Retail Customer Experience' || data.val().nama_divisi === 'Business Process & Training' || data.val().nama_divisi === 'Service Quality & Exp Assurance' || data.val().nama_divisi === 'Customer Journey'){
                        const findDivisi = anakDivisi.indexOf(data.val().nama_divisi)
                        console.log('findDivisi '+findDivisi)
                        anakDivisi.splice(findDivisi,1)
                    }
                    console.log('anakDivisi '+anakDivisi)
                })
                console.log('anakDivisi '+anakDivisi)
                for(let i=0; i<anakDivisi.length; i++) {
                    const idDivBaru = annRef.push().key+anakDivisi[i].replace(/ |&/gi, "");
                    annRef.child(idDivBaru).set({
                        nama_divisi: anakDivisi[i]
                    })
                }
            })
        } else if(divKerja === 'Collection & Billing Mgt'){
            annRef.once('value', (snapshot)=>{
                let anakDivisi = ['Collection & Payment','Billing & Administration','Verification & Credit Monitoring'];
                snapshot.forEach((data)=>{
                    if(data.val().nama_divisi === 'Collection & Payment' || data.val().nama_divisi === 'Billing & Administration' || data.val().nama_divisi === 'Verification & Credit Monitoring'){
                        const findDivisi = anakDivisi.indexOf(data.val().nama_divisi)
                        console.log('findDivisi '+findDivisi)
                        anakDivisi.splice(findDivisi,1)
                    }
                    console.log('anakDivisi '+anakDivisi)
                })
                console.log('anakDivisi '+anakDivisi)
                for(let i=0; i<anakDivisi.length; i++) {
                    const idDivBaru = annRef.push().key+anakDivisi[i].replace(/ |&/gi, "");
                    annRef.child(idDivBaru).set({
                        nama_divisi: anakDivisi[i]
                    })
                }
            })
        } else if(divKerja === 'Biz Support & Development'){
            annRef.once('value', (snapshot)=>{
                let anakDivisi = ['Business Planning & Project Tracking','Infra Support & Tech Development'];
                snapshot.forEach((data)=>{
                    if(data.val().nama_divisi === 'Business Planning & Project Tracking' || data.val().nama_divisi === 'Infra Support & Tech Development'){
                        const findDivisi = anakDivisi.indexOf(data.val().nama_divisi)
                        console.log('findDivisi '+findDivisi)
                        anakDivisi.splice(findDivisi,1)
                    }
                    console.log('anakDivisi '+anakDivisi)
                })
                console.log('anakDivisi '+anakDivisi)
                for(let i=0; i<anakDivisi.length; i++) {
                    const idDivBaru = annRef.push().key+anakDivisi[i].replace(/ |&/gi, "");
                    annRef.child(idDivBaru).set({
                        nama_divisi: anakDivisi[i]
                    })
                }
            })
        } else if(divKerja === 'CX Analytics & Insights'){
            annRef.once('value', (snapshot)=>{
                let findDivisi = 0;
                snapshot.forEach((data)=>{
                    if(data.val().nama_divisi === 'CX Reporting Team'){
                        findDivisi = findDivisi + 1;
                    }
                })
                if(findDivisi === 0) {
                    const idDivBaru = annRef.push().key+'CXReportingTeam';
                    annRef.child(idDivBaru).set({
                        nama_divisi: 'CX Reporting Team'
                    })
                }
            })
        }
    } catch(error){
        return error;
    }
}

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

//Menambahkan divisi kerja
router.post('/:user_id/announcement', (req,res)=>{

    const userDataRef = db.ref('/users/'+req.params.user_id)
    userDataRef.once('value',(snapshot)=>{
        var divKerjaUser = snapshot.child('divisi_kerja').val();

        //tambah user ke announcement
        try{
            annRef.once('value', (snapshot)=>{
                let findDivisi = 0;
                snapshot.forEach((data)=>{
                    if(data.val().nama_divisi === divKerjaUser){
                        findDivisi = findDivisi + 1;
                    }
                })
                if(findDivisi === 0){
                    const idDivBaru = annRef.push().key+divKerjaUser.replace(/ |&/gi, "");
                    annRef.child(idDivBaru).set({
                        nama_divisi: divKerjaUser
                    })
                }
            })
            tambahDivKerja(divKerjaUser)

            res.status(200).json({
                message: "Berhasil menambahkan announcement "+divKerjaUser
            })
        } catch(error){
            res.status(500).json({message: "Terjadi error"})
        }
    })
})

//kirim pesan
/*
Request body : message/file
*/
router.post('/:user_id/announcement/chat', uploadApaaja.single('message'), (req,res)=>{
    //today date
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    const today = mm + '/' + dd + '/' + yyyy

    annRef.once('value',(snapshot)=>{
        snapshot.forEach((data)=>{
            if(data.val().nama_divisi === req.body.nama_divisi){
                const annChatRef = db.ref('/announcements/'+data.key+'/chat')
                const annChatId = annChatRef.push().key;
                try{
                    let filenya = ''
                    try{
                        console.log(req.file.filename)
                        async function uploadFile() {
                            await cstorage.upload(`../backend/files/${req.file.filename}`,{
                                destination: `Announcement/${req.body.nama_divisi.replace(/ |&/gi, "")}/${req.file.filename}`
                            });
                            await cstorage.file(`Announcement/${req.body.nama_divisi.replace(/ |&/gi, "")}/${req.file.filename}`).makePublic();
                            const filepath = path.resolve(`./files/${req.file.filename}`);
                            fs.unlinkSync(filepath);
                        }
                        uploadFile().catch(console.error);
                        filenya = `https://storage.googleapis.com/bangkit_chatapp_bucket/Announcement/${req.body.nama_divisi.replace(/ |&/gi, "")}/${req.file.filename}`
                    } catch(error){
                        filenya = req.body.message
                    }
        
                    annChatRef.child(annChatId).set({
                        message: filenya,
                        timestamp: today,
                        sender: req.body.nama_divisi
                    })
                    sebarChat(req.body.nama_divisi,filenya,today)
        
                    res.status(200).json({message: "Pesan berhasil terkirim"});
                } catch(error){
                    res.status(500).json({message: "Error when send a chat"})
                }
            }
        })
    })
})

//get all chat
router.get('/:user_id/announcement', (req,res) => {
    const annRef = db.ref('/announcements')
    let id = ""
    try{
        annRef.once('value', snapshot =>{
            snapshot.forEach((data) =>{
                if(data.val().nama_divisi == req.body.divisi){
                    id = data.key
                }
            })
            const annChatRef = db.ref('/announcements/'+id+'/chat')
            const annChatKey = annChatRef.push().key

            annChatRef.once('value', snapshot => {
                res.status(200).send({
                    snapshot
                })
            })
        })
    } catch(error){
        res.status(500).send({
            message: "Gagal mendapatkan chat"
        })
    }
})

module.exports = router