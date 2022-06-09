const nodemailer = require('nodemailer')

const kirimEmail = function(tujuan) {
    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "redteamioh@outlook.com", //dibuat env
            pass: "7april2022" //dibuat env
        }
    })
    let mailOptions = {
        from: "redteamioh@outlook.com",
        to: tujuan,
        subject: "Approve Divisi Kerja",
        text: "Anda sudah disetujui pada divisi kerja yang baru"
    }
    transporter.sendMail(mailOptions, function (err,success){
        if(err){
            console.log(err)
        } else{
            console.log('yey berhasil kirim email')
        }
    })
}

module.exports = kirimEmail