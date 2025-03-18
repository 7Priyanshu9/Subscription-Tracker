import Subscription from "../models/subscriptionModel.js";
import {client} from '../config/upstatsh.js'
import {SERVER_URL} from '../config/env.js'

export const createSubs = async (req, res, next) => {
    try {
        // before creating a subs we need to validate the user 
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });
        const response = await client.trigger({
            url: `${SERVER_URL}/api/workflow/subscription/remainder`,
            body: { subsID: subscription.id },
            headers: { 'Content-Type': 'application/json' },
            retries: 0,
        });

        console.log("Upstash Trigger Response:", response);

        // Extract workflowRunId
        const { workflowRunId } = response;

        if (!workflowRunId) {
            console.error("Workflow Run ID is missing from the response.");
            throw new Error("Workflow failed to generate.");
        }

        // Update the subscription with workflowRunId
        subscription.workflowRunId = workflowRunId;
        await subscription.save();

        // Return response
        res.status(201).json({
            success: true,
            data: { subscription, workflowRunId }
        });
    } catch (e) {
        next(e);
    }
}

export const getUserSubs = async(req,res,next)=>{
    // 1. find the used id from the req.user
    // 2. find the subs with the user id
    // 3. return the subs
    try{
        //user can only view his own subs no other users here if user trying to get other users details then error 
       if(req.user.id !== req.params.id){
        const error = new Error("You can't view other user's subscription");
        error.status = 401;
        throw error;
       }

        const subs = await Subscription.find({user:req.params.id});
        res.status(200).json({success:true,data:subs});

    }   catch(e)    {
        next(e);
    }
}

export const getSubById = async(req,res,next)=>{
    try{
        const result = await Subscription.findById(req.params.id);
        res.status(200).json({success:true,data:result});
    }catch(e){
        next(e);
    }
}

//67d4531a012684f40aff1a45