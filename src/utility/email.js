import nodemailer from "nodemailer";
import {EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_USER} from "../../src/config/config.js";

const SendEmail = async(email, subject, emailBody)=>{


    let transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: false,
        auth:{
            user: EMAIL_USER,
            pass: EMAIL_PASS
        },
        tls:{
            rejectUnauthorized: false
        }
    })

    let mailOptions = {
        from: "monirhossain0556@gmail.com",
        to: email,
        subject,
        html: emailBody
    }


    return await transporter.sendMail(mailOptions)
}

export default SendEmail;