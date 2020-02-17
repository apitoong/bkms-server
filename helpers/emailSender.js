var nodemailer = require('nodemailer');

function sendEmailHelper(receiver, subjectMail, wysywg) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.gmailUser,// process.env.PORT
            pass: process.env.gmailPass
        }
    });


    var mailOptions = {
        from: process.env.gmailHost,
        to: receiver,
        subject: subjectMail,

        html: wysywg  // html body
        // html: params.mailHtmlContent,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}



module.exports = {
    sendEmailHelper
}