import  Subscription  from "../models/subscriptionModel.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// this will fix the error of importing common js module in es module
const { serve } = require("@upstash/workflow/express");
// we do it as in docs serve is written in common js module so here we need require
import dayjs from "dayjs";
import {sendRemainderMail} from '../utils/send.mail.js'

// our system need module so we need to fuix it 
// export const sendEmail = serve(async (context) => {
//     const { subscriptionID } = context.requestPayload;
//     const subs = await fetchSubscription(context,subscriptionID);


//     // if no subs then no need to send notification 
//     if (!subs || subs.status !== "active") return;
    
//     //calculate renewal date 
//     const renewalDate = dayjs(subs.renewalDate);
//     if (renewalDate.isBefore(dayjs())) {
//         console.log(`Renewal date is passed for ${subscriptionID} account stopping the workflow`);
//         return;
//     }
    
//     const remainderDay = [10, 7, 3, 1];
//     for (const daysBefore of remainderDay) {
//         const diff = renewalDate.subtract(daysBefore, 'day');
//         if (diff.isAfter(dayjs())) {
//             await remainInactiveUntilRemainder(context, `remainder ${day} days before`, diff)
//         }
        
//         if(dayjs().isSame(diff,'day')){
//         await triggerRemainder(context, `remainder ${day} days before`,subs);
//         }
//     }
// });



export const sendEmail = serve(async (context) => {
    console.log("Workflow triggered with payload:", context.requestPayload);

    const { subsID: subscriptionID } = context.requestPayload;
    if (!subscriptionID) {
        console.error("No subscriptionID found in payload");
        return;
    }

    // Wrap the subscription fetch in `context.run`
    const subs = await context.run('fetchSubscription', async () => {
        return await fetchSubscription(context, subscriptionID);
    });

    console.log("Fetched subscription:", subs);

    if (!subs || subs.status !== "active") {
        console.log(`Subscription ${subscriptionID} is not active or not found`);
        return;
    }

    const renewalDate = dayjs(subs.renewalDate);
    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date is passed for ${subscriptionID}. Stopping workflow.`);
        return;
    }

    const remainderDays = [10, 7, 3, 1];
    for (const daysBefore of remainderDays) {
        const diff = renewalDate.subtract(daysBefore, 'day');
        if (diff.isAfter(dayjs())) {
            console.log(`Scheduling reminder for ${daysBefore} days before renewal`);
            await remainInactiveUntilRemainder(context, `remainder ${daysBefore} days before`, diff);
        }

        if (dayjs().isSame(diff, 'day')) {
            console.log(`Triggering reminder for ${daysBefore} days before renewal`);
            await triggerRemainder(context, `remainder ${daysBefore} days before`, subs);
        }
    }
});

const fetchSubscription = async(context,subscriptionID)=>{
    return await context.run('get subs',async()=>{
        return Subscription.findById(subscriptionID).populate('user','name email');
    })
}

const remainInactiveUntilRemainder = async(context,label,date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

// const triggerRemainder = async(context,label,subs)=>{
//     return await context.run(label,async()=>{
//         console.log(`Triggering ${label} reminder`);

//          await sendRemainderMail({
//              to: subs.user.email,
//              type:label,
//              subs,
//          })
//     })
// }

const triggerRemainder = async (context, label, subs) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder for subscription ${subs._id}`);

        try {
            await sendRemainderMail({
                to: subs.user.email,
                type: label,
                subscription: subs, // Fix: Pass `subscription` instead of `subs`
            });
            console.log(`Reminder email sent for ${label}`);
        } catch (error) {
            console.error(`Error sending reminder email for ${label}:`, error);
        }
    });
};