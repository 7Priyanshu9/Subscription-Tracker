import Subscription from "../models/subscriptionModel.js";


export const createSubs = async (req,res,next)=>{
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })
    } catch(e){
        next(e);
    }
}