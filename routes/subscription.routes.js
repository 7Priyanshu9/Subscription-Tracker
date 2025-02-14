import {Router} from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req,res)=>{
    res.send({
        message: 'GET all Subscriptions',
    })
})

subscriptionRouter.get('/:id',(req,res)=>{
    res.send({
        message: 'GET Subscriptions by ID',
    })
})


subscriptionRouter.post('/',(req,res)=>{
    res.send({
        message: 'CREATE Subscriptions',
    })
})


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


subscriptionRouter.get('/user/:id',(req,res)=>{
    res.send({
        message: 'GET all user Subscriptions',
    })
})


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