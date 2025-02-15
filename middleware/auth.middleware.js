const authorize = async(req,res,next) => {
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization('Bearer')){
            token= req.headers.authorization.split
        }


    }   catch(error){
        res.status(401).json({message: "Unauthorized", error:error.message});
    }
}