const nodemailer = require('nodemailer');

const sendMail = async (subject, html, email) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'gamelandstaff@gmail.com',
            pass: process.env.PASSWORD_GMAIL
        },
        tls: {
            rejectUnauthorized: false
        },
    })
    mailOptions = {
        from: "Remitente",
        to: email,
        subject: subject,
        html: html
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            console.log(process.env.PASSWORD_GMAIL);
        }else{
            console.log('Email sent')
        }
    })

}

module.exports = {
    sendMail
}