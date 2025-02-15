import { Router} from "express";
import { signIn, signOut, signUp } from "../controller/auth.controller.js";

const authRouter = Router();
authRouter.post('/sign-up',signUp);
// authRouter.post('/sign-up',(req,res)=>{})  here the main logic comes from controller signup so directly import it here 
authRouter.post('/sign-in',signIn);
// authRouter.post('/login',(req,res)=>{}) 
authRouter.post('/sign-out',signOut);
// authRouter.post('/sign-out',(req,res)=>{})

export default authRouter;
