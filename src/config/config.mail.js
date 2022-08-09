const mail = {
    user: 'gameland@gmail.com',
    pass: 'gameland123'
}

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 2525,
    tls: {
        rejectUnauthorized: false
    },
    secure: false, // true for 465, false for other ports
    auth: {
        user: mail.user, // generated ethereal user
        pass: mail.user, // generated ethereal password
    },
});

const sendMail = async (email, subject, html) => {
    try {
        await transporter.sendMail({
            from: `Gameland <${mail.user}>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            html // html body
        });
    } catch (error) {
        console.log("Algo salio mal", error);
    }
}

module.exports = {
    sendMail
}