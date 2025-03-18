import nodemailer from 'nodemailer'
import { Nodemail_Password } from './env.js'

export const userMail = 'S1nister9779@gmail.com'
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
         user:userMail,
        pass: Nodemail_Password,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error verifying transporter:', error);
    } else {
        console.log('Transporter is ready to send emails');
    }
});

export default transporter;