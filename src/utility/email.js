import nodemailer from "nodemailer";
import {EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_USER, RESEND_API_KEY} from "../../src/config/config.js";

import { Resend } from 'resend';

// const SendEmail = async(email, subject, emailBody)=>{


//     let transporter = nodemailer.createTransport({
//         host: EMAIL_HOST,
//         port: EMAIL_PORT,
//         secure: false,
//         auth:{
//             user: EMAIL_USER,
//             pass: EMAIL_PASS
//         },
//         tls:{
//             rejectUnauthorized: false
//         }
//     })

//     let mailOptions = {
//         from: "monirhossain0556@gmail.com",
//         to: email,
//         subject,
//         html: emailBody
//     }


//     return await transporter.sendMail(mailOptions)
// }

// export default SendEmail;
const resend = new Resend(RESEND_API_KEY);
export const SendEmail = async (email, subject, emailBody) => {
    try {
        const result = await resend.emails.send({
            from: 'E-commerce <noreply@ecommerce.onresend.com>', // No need to verify domain
            to: email,
            subject,
            html: emailBody
        });
        console.log("Email sent:", result);
    } catch (err) {
        console.error("Resend email error:", err);
        throw err;
    }
};