import { JWT_SECRET } from "../config/env.js";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'


// 1. someone is amking a request to get user details 
// 2. so this middleware will authorize it 
// 3. verify the user
// 4. if valid then move to next()
// 5. that user will get user details 

const authorize = async(req,res,next) => {
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token= req.headers.authorization.split(' ')[1];
        }

        if(!token) return res.status(401).json({message:"Unauthorized"});

        const decoded = jwt.verify(token,JWT_SECRET)

        const user = await User.findById(decoded.userId)

        if(!user) return res.status(401).json({message:'unauthorized'});
        
        req.user=user;
        
        next()



    }   catch(error){
        res.status(401).json({message: "Unauthorized", error:error.message});
    }
}

export default authorize;