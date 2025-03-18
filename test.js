import transporter, { userMail } from './config/nodemailer.js';

const sendTestEmail = async () => {
    const mailOptions = {
        from: userMail,
        to: 'aec.cse.priyanshupaul@gmail.com', // Replace with a valid email address
        subject: 'Test Email',
        text: 'This is a test email from Nodemailer.',
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

sendTestEmail();