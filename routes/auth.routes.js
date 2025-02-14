import { Router} from "express";
import { login, signOut, signUp } from "../controller/auth.controller";

const authRouter = Router();
authRouter.post('/sign-up',signUp);
// authRouter.post('/sign-up',(req,res)=>{})  here the main logic comes from controller signup so directly import it here 
authRouter.post('/sign-in',login);
// authRouter.post('/sign-up',(req,res)=>{}) 
authRouter.post('/sign-out',signOut);
// authRouter.post('/sign-up',(req,res)=>{})

export default authRouter;
