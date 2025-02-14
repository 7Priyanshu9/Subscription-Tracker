import {Router} from 'express'


const userRouter = Router();


userRouter.get('/',(req,res)=>{
    res.send({
        message:"GET all users"
    })
});

// /user is static parameter everytime we get same result
// /:id means dynamic paramerter everytime we get different user details 

userRouter.get('/:id',(req,res)=>{
    res.send({
        message:"GET users by id "
    })
});

userRouter.post('/',(req,res)=>{
    res.send({
        message:"CREATE new users"
    })
});


userRouter.put('/:id',(req,res)=>{
    res.send({
        message:"UPDATE data of users by id"
    })
});


userRouter.delete('/',(req,res)=>{
    res.send({
        message:"DELETE a users"
    })
});

export default userRouter;