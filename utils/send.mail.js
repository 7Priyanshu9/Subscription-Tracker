// import { emailTemplates } from "./email.templete.js";
// import transporter,{ userMail } from "../config/nodemailer.js";
// import dayjs from 'dayjs'

// export const sendRemainderMail = async({to,type,subscription}) => {
//     if(!to || !type) return new Error("Missing Parameters");

//     const templete = emailTemplates.find((t)=>t.label === type);

//     if(!templete) throw new Error('Invalid email type');

//     const mailInfo = {
//         uName: subscription.user.name,
//         subscriptionName:subscription.name,
//         renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
//         planName: subscription.name,
//         price:`${subscription.currency} ${subscription.price}(${subscription.frequency})`,
//         paymentMethod: subscription.paymentMethod,
//     }

//     const message = templete.generateBody(mailInfo);
//     const subject = templete.generateSubject(mailInfo);
//     const mailOption = {
//         from: userMail,
//         to:to,
//         subject: subject,
//         html: message,
//     }
//     transporter.sendMail(mailOption,(error,info)=>{
//         if(error) return console.log(error, 'Error sending email');

//         console.log('Email sent: ' + info.response);
//       })
// }



import { emailTemplates } from "./email.templete.js";
import transporter, { userMail } from "../config/nodemailer.js";
import dayjs from 'dayjs';

export const sendRemainderMail = async ({ to, type, subscription }) => {
    if (!to || !type) throw new Error("Missing Parameters");

    const template = emailTemplates.find((t) => t.label === type);

    if (!template) throw new Error('Invalid email type');

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
        accountSettingsLink: "#", // Replace with actual link
        supportLink: "#", // Replace with actual link
        daysLeft: type.split(" ")[0], // Extract days left from the type
    };

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: userMail,
        to: to,
        subject: subject,
        html: message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
