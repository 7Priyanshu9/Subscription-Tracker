import express from 'express'
import { PORT } from './config/env.js'
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectDB from './DB/db.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';



const app = express();

// predefined middlewares of express 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

//use the routes similar to middleware we need to go t0 /api/auth to enter into auth route
// similarly with the other routes
app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);
app.use('/api/subscriptions',subscriptionRouter);

app.use(errorMiddleware)

app.get('/',(req,res)=>{
    res.send('Welcome to subscription system')
})

 

app.listen(PORT, async ()=>{
    console.log(`Server running in https://localhost:${PORT}`);

    await connectDB();
})

export default app;
