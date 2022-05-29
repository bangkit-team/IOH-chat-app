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

Masukkin user ke announc nya dan hapus di announc yg sblmnya klo ada:
localhost:3000/user/:user_id/announcement
- Request body : divKerjaSebelum
  itu cuma diperlukan kalau org itu mau pindah divisi

Kirim pesan:
localhost:3000/user/:user_id/announcement/:div_id
- Request body : message, file
*/

function hapusDivKerja(user,divKerja){
    if(divKerja === 'Contact Center'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'Call Center' || data.val().nama_divisi === 'Digital' || data.val().nama_divisi === 'Customer Relation' || data.val().nama_divisi === 'VIP Services'){
                    const dataRef = db.ref('/announcements/'+data.key+'/users/'+user)
                    dataRef.remove();
                }
            })
        })
    } else if(divKerja === 'Customer Experience Excellence'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'Retail Customer Experience' || data.val().nama_divisi === 'Business Process & Training' || data.val().nama_divisi === 'Service Quality & Exp. Assurance' || data.val().nama_divisi === 'Customer Journey'){
                    const dataRef = db.ref('/announcements/'+data.key+'/users/'+user)
                    dataRef.remove();
                }
            })
        })
    } else if(divKerja === 'Collection & Billing Mgt'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'Collection & Payment' || data.val().nama_divisi === 'Billing & Administration' || data.val().nama_divisi === 'Verification & Credit Monitoring'){
                    const dataRef = db.ref('/announcements/'+data.key+'/users/'+user)
                    dataRef.remove();
                }
            })
        })
    } else if(divKerja === 'Biz. Support & Development'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'Business Planning & Project Tracking' || data.val().nama_divisi === 'Infra. Support & Tech. Development'){
                    const dataRef = db.ref('/announcements/'+data.key+'/users/'+user)
                    dataRef.remove();
                }
            })
        })
    } else if(divKerja === 'CX Analytics & Insights'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'CX Reporting Team'){
                    const dataRef = db.ref('/announcements/'+data.key+'/users/'+user)
                    dataRef.remove();
                }
            })
        })
    }
}

function tambahDivKerja(user,divKerja,email,timestamp){
    try{
        if(divKerja === 'Contact Center'){
            annRef.once('value', (snapshot)=>{
                let anakDivisi = ['Call Center','Digital','Customer Relation','VIP Services']
                snapshot.forEach((data)=>{
                    if(data.val().nama_divisi === 'Call Center' || data.val().nama_divisi === 'Digital' || data.val().nama_divisi === 'Customer Relation' || data.val().nama_divisi === 'VIP Services'){
                        const findDivisi = anakDivisi.indexOf(data.val().nama_divisi)
                        const usersRef = db.ref('/announcements/'+data.key+'/users')
                        usersRef.child(user).set({
                            emailUser: email,
                            join_timestamp:timestamp
                        })
                        console.log('findDivisi '+findDivisi)
                        anakDivisi.splice(findDivisi,1)
                    }
                    console.log('anakDivisi '+anakDivisi)
                })
                console.log('anakDivisi '+anakDivisi)
                for(let i=0; i<anakDivisi.length; i++) {
                    const idDivBaru = annRef.push().key;
                    annRef.child(idDivBaru).set({
                        nama_divisi: anakDivisi[i]
                    })
                    const usersRef = db.ref('/announcements/'+idDivBaru+'/users')
                    usersRef.child(user).set({
                        emailUser: email,
                        join_timestamp:timestamp
                    })
                }
            })
        } else if(divKerja === 'Customer Experience Excellence'){
            annRef.once('value', (snapshot)=>{
                let anakDivisi = ['Retail Customer Experience','Business Process & Training','Service Quality & Exp. Assurance','Customer Journey'];
                snapshot.forEach((data)=>{
                    if(data.val().nama_divisi === 'Retail Customer Experience' || data.val().nama_divisi === 'Business Process & Training' || data.val().nama_divisi === 'Service Quality & Exp. Assurance' || data.val().nama_divisi === 'Customer Journey'){
                        const findDivisi = anakDivisi.indexOf(data.val().nama_divisi)
                        const usersRef = db.ref('/announcements/'+data.key+'/users')
                        usersRef.child(user).set({
                            emailUser: email,
                            join_timestamp:timestamp
                        })
                        console.log('findDivisi '+findDivisi)
                        anakDivisi.splice(findDivisi,1)
                    }
                    console.log('anakDivisi '+anakDivisi)
                })
                console.log('anakDivisi '+anakDivisi)
                for(let i=0; i<anakDivisi.length; i++) {
                    const idDivBaru = annRef.push().key;
                    annRef.child(idDivBaru).set({
                        nama_divisi: anakDivisi[i]
                    })
                    const usersRef = db.ref('/announcements/'+idDivBaru+'/users')
                    usersRef.child(user).set({
                        emailUser: email,
                        join_timestamp:timestamp
                    })
                }
            })
        } else if(divKerja === 'Collection & Billing Mgt'){
            annRef.once('value', (snapshot)=>{
                let anakDivisi = ['Collection & Payment','Billing & Administration','Verification & Credit Monitoring'];
                snapshot.forEach((data)=>{
                    if(data.val().nama_divisi === 'Collection & Payment' || data.val().nama_divisi === 'Billing & Administration' || data.val().nama_divisi === 'Verification & Credit Monitoring'){
                        const findDivisi = anakDivisi.indexOf(data.val().nama_divisi)
                        const usersRef = db.ref('/announcements/'+data.key+'/users')
                        usersRef.child(user).set({
                            emailUser: email,
                            join_timestamp:timestamp
                        })
                        console.log('findDivisi '+findDivisi)
                        anakDivisi.splice(findDivisi,1)
                    }
                    console.log('anakDivisi '+anakDivisi)
                })
                console.log('anakDivisi '+anakDivisi)
                console.log('anakDivisilength '+anakDivisi.length)
                for(let i=0; i<anakDivisi.length; i++) {
                    const idDivBaru = annRef.push().key;
                    annRef.child(idDivBaru).set({
                        nama_divisi: anakDivisi[i]
                    })
                    const usersRef = db.ref('/announcements/'+idDivBaru+'/users')
                    usersRef.child(user).set({
                        emailUser: email,
                        join_timestamp:timestamp
                    })
                    console.log('brp kali ini '+i)
                }
            })
        } else if(divKerja === 'Biz. Support & Development'){
            annRef.once('value', (snapshot)=>{
                let anakDivisi = ['Business Planning & Project Tracking','Infra. Support & Tech. Development'];
                snapshot.forEach((data)=>{
                    if(data.val().nama_divisi === 'Business Planning & Project Tracking' || data.val().nama_divisi === 'Infra. Support & Tech. Development'){
                        const findDivisi = anakDivisi.indexOf(data.val().nama_divisi)
                        const usersRef = db.ref('/announcements/'+data.key+'/users')
                        usersRef.child(user).set({
                            emailUser: email,
                            join_timestamp:timestamp
                        })
                        console.log('findDivisi '+findDivisi)
                        anakDivisi.splice(findDivisi,1)
                    }
                    console.log('anakDivisi '+anakDivisi)
                })
                console.log('anakDivisi '+anakDivisi)
                for(let i=0; i<anakDivisi.length; i++) {
                    const idDivBaru = annRef.push().key;
                    annRef.child(idDivBaru).set({
                        nama_divisi: anakDivisi[i]
                    })
                    const usersRef = db.ref('/announcements/'+idDivBaru+'/users')
                    usersRef.child(user).set({
                        emailUser: email,
                        join_timestamp:timestamp
                    })
                }
            })
        } else if(divKerja === 'CX Analytics & Insights'){
            annRef.once('value', (snapshot)=>{
                let findDivisi = 0;
                snapshot.forEach((data)=>{
                    if(data.val().nama_divisi === 'CX Reporting Team'){
                        findDivisi = findDivisi + 1;
                        const usersRef = db.ref('/announcements/'+data.key+'/users')
                        usersRef.child(user).set({
                            emailUser: email,
                            join_timestamp:timestamp
                        })
                    }
                })
                if(findDivisi === 0) {
                    const idDivBaru = annRef.push().key;
                    annRef.child(idDivBaru).set({
                        nama_divisi: 'CX Reporting Team'
                    })
                    const usersRef = db.ref('/announcements/'+idDivBaru+'/users')
                    usersRef.child(user).set({
                        emailUser: email,
                        join_timestamp:timestamp
                    })
                }
            })
        }
    } catch(error){
        return error;
    }
}

function sebarChatTanpaFile(div_id,divKerja,message,timestamp){
    if(div_id === 'Contact Center'){
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
                if(data.val().nama_divisi === 'Retail Customer Experience' || data.val().nama_divisi === 'Business Process & Training' || data.val().nama_divisi === 'Service Quality & Exp. Assurance' || data.val().nama_divisi === 'Customer Journey'){
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
    } else if(divKerja === 'Biz. Support & Development'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'Business Planning & Project Tracking' || data.val().nama_divisi === 'Infra. Support & Tech. Development'){
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

function sebarChatFile(div_id,divKerja,message,timestamp,file){
    if(divKerja === 'Contact Center'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'Call Center' || data.val().nama_divisi === 'Digital' || data.val().nama_divisi === 'Customer Relation' || data.val().nama_divisi === 'VIP Services'){
                    const dataRef = db.ref('/announcements/'+data.key+'/chat/')
                    const idnya = dataRef.push().key;
                    dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:divKerja,file:file})
                }
            })
        })
    } else if(divKerja === 'Customer Experience Excellence'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'Retail Customer Experience' || data.val().nama_divisi === 'Business Process & Training' || data.val().nama_divisi === 'Service Quality & Exp. Assurance' || data.val().nama_divisi === 'Customer Journey'){
                    const dataRef = db.ref('/announcements/'+data.key+'/chat/')
                    const idnya = dataRef.push().key;
                    dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:divKerja,file:file})
                }
            })
        })
    } else if(divKerja === 'Collection & Billing Mgt'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'Collection & Payment' || data.val().nama_divisi === 'Billing & Administration' || data.val().nama_divisi === 'Verification & Credit Monitoring'){
                    const dataRef = db.ref('/announcements/'+data.key+'/chat/')
                    const idnya = dataRef.push().key;
                    dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:divKerja,file:file})
                }
            })
        })
    } else if(divKerja === 'Biz. Support & Development'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'Business Planning & Project Tracking' || data.val().nama_divisi === 'Infra. Support & Tech. Development'){
                    const dataRef = db.ref('/announcements/'+data.key+'/chat/')
                    const idnya = dataRef.push().key;
                    dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:divKerja,file:file})
                }
            })
        })
    } else if(divKerja === 'CX Analytics & Insights'){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === 'CX Reporting Team'){
                    const dataRef = db.ref('/announcements/'+data.key+'/chat/')
                    const idnya = dataRef.push().key;
                    dataRef.child(idnya).set({message: message,timestamp:timestamp,sender:divKerja,file:file})
                }
            })
        })
    }
}

//masukkin user ke announc nya dan hapus di announc yg sblmnya klo ada
/*
Request body : divKerjaSebelum
itu cuma diperlukan kalau org itu mau pindah divisi
*/
router.post('/:user_id/announcement', (req,res)=>{
    const date = new Date();
    const dateToday = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()

    if(req.body.divKerjaSebelum){
        annRef.once('value', (snapshot)=>{
            snapshot.forEach((data)=>{
                if(data.val().nama_divisi === req.body.divKerjaSebelum){
                    const dataRef = db.ref('/announcements/'+data.key+'/users/'+req.params.user_id)
                    dataRef.remove();
                }
            })
        })
        hapusDivKerja(req.params.user_id,req.body.divKerjaSebelum);
    }

    const userDataRef = db.ref('/users/'+req.params.user_id)
    userDataRef.once('value',(snapshot)=>{
        var emailUser = snapshot.child('email').val();
        var divKerjaUser = snapshot.child('divisi_kerja').val();

        //tambah user ke announcement
        try{
            annRef.once('value', (snapshot)=>{
                let findDivisi = 0;
                let idDiv = null;
                snapshot.forEach((data)=>{
                    if(data.val().nama_divisi === divKerjaUser){
                        findDivisi = findDivisi + 1;
                        idDiv = data.key;
                    }
                })
                if(findDivisi != 0){
                    const usersRef = db.ref('/announcements/'+idDiv+'/users')
                    usersRef.child(req.params.user_id).set({
                        emailUser: emailUser,
                        join_timestamp:dateToday
                    })
                } else{
                    const idDivBaru = annRef.push().key;
                    annRef.child(idDivBaru).set({
                        nama_divisi: divKerjaUser
                    })
                    const usersRef = db.ref('/announcements/'+idDivBaru+'/users')
                    usersRef.child(req.params.user_id).set({
                        emailUser: emailUser,
                        join_timestamp:dateToday
                    })
                }
            })
            tambahDivKerja(req.params.user_id,divKerjaUser,emailUser,dateToday)

            res.status(200).json({
                message: "Berhasil menambahkan user ke announcement "+divKerjaUser
            })
        } catch(error){
            res.status(500).json({message: "Terjadi error"})
        }
    })
})

//kirim pesan
/*
Request body : message, file
*/
router.post('/:user_id/announcement/:div_id', uploadApaaja.single('file'), (req,res)=>{
    const date = new Date();
    const timeToday = date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()

    const annChatRef = db.ref('/announcements/'+req.params.div_id+'/chat')
    const annChatId = annChatRef.push().key;

    const userDataRef = db.ref('/users/'+req.params.user_id)
    userDataRef.once('value',(snapshot)=>{
        var divKerjaUser = snapshot.child('divisi_kerja').val();
        try{
            try{
                console.log(req.file.filename) 
                async function uploadFile() {
                    await cstorage.upload(`../backend/files/${req.file.filename}`,{
                        destination: `Announcement/${divKerjaUser}/${req.file.filename}`
                    });
                    const filepath = path.resolve(`./files/${req.file.filename}`);
                    fs.unlinkSync(filepath);
                }
                uploadFile().catch(console.error);
                const filenya = `https://storage.googleapis.com/bangkit_chatapp_bucket/Announcement/${divKerjaUser}/${req.file.filename}`
                annChatRef.child(annChatId).set({
                    message: req.body.message,
                    timestamp: timeToday,
                    sender: divKerjaUser,
                    file: filenya
                })
                sebarChatFile(req.params.div_id,divKerjaUser,req.body.message,timeToday,filenya)
            } catch(error){
                annChatRef.child(annChatId).set({
                    message: req.body.message,
                    timestamp: timeToday,
                    sender: divKerjaUser
                })
                sebarChatTanpaFile(req.params.div_id,divKerjaUser,req.body.message,timeToday)
            }

            res.status(200).json({message: "Pesan berhasil terkirim"});
        } catch(error){
            res.status(500).json({message: "Error when send a chat"})
        }
    })
})

//get all chat
router.get('/:user_id/announcement/:div_id', (req,res) => {
    const annChatRef = db.ref('/announcements/'+req.params.div_id+'/chat')
    try{
        annChatRef.once('value', snapshot =>{
            res.status(200).send({
                snapshot
            })
        })
    } catch(error){
        res.status(500).send({
            message: "Gagal mendapatkan chat"
        })
    }
})

module.exports = router