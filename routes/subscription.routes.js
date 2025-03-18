import {Router} from 'express';
import { createSubs } from '../controller/subscription.control.js';
import authorize from '../middleware/auth.middleware.js';
import { getUserSubs } from '../controller/subscription.control.js';
import { getSubById } from '../controller/subscription.control.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req,res)=>{
    res.send({
        message: 'GET all Subscriptions',
    })
})

subscriptionRouter.get('/:id',authorize,getSubById);


subscriptionRouter.post('/',authorize,createSubs);


subscriptionRouter.put('/:id',(req,res)=>{
    res.send({
        message: 'UPDATE Subscriptions',
    })
})


subscriptionRouter.delete('/:id',(req,res)=>{
    res.send({
        message: 'DELETE Subscriptions by ID',
    })
})


subscriptionRouter.get('/user/:id',authorize,getUserSubs);


subscriptionRouter.put('/:id/cancel',(req,res)=>{
    res.send({
        message: 'CANCEL Subscriptions by id',
    })
})

subscriptionRouter.get('/upcoming-renewals',(req,res)=>{
    res.send({
        message: 'GET upcoming renewal Subscriptions',
    })
})

export default subscriptionRouter;