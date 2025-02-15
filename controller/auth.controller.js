import mongoose from 'mongoose'
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

export const signUp = async (req, res, next) => {

    const session = await mongoose.startSession();
    // session.startTransaction();
    try {
        // create a new user
        const { name, email, password } = req.body;

        // check if user already exist

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            const error = new Error('User already exist');
            error.status = 409;
            throw error;
        }

        //hash password as no pre existing user is there 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create an array where the email password and name are stored along with the session 
        const newUser = await User.create([{ name, email, password: hashedPassword }], { session })

        const token = jwt.sign({
            userId: newUser[0]._id
        }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
        // await session.commitTransaction();
        // session.endSession();

        res.status(201).json({
            success: true,
            message: 'User Created Successfully',
            data: {
                token: token,
                user: newUser[0],
            }

        })
    } catch (error) {
        // await session.abortTransaction();
        // session.endSession();
        next(error);
    }

}

export const signIn = async (req, res, next) => {
    try {
        //acqire the email and password from req body
        const { email, password } = req.body;

        //find if the email exist in DB
        const user = await User.findOne({ email });

        //if user is not present then user not found 
        if (!user) {
            const error = new Error('User not found.');
            error.status = 404;
            throw error;
        }

        //check the password 
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            const error = new Error('Invalid password.');
            error.status = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.status(200).json({
            success: true,
            message: "User signed in Successfully",
            data: {
                token: token,
                user: user,
            }
        });
    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {
    try{

    }catch(error){
        next(error);
    }


}




// //{
//     "email":"aec.cse.princeraj@gmail.com",
//     "password":"Raj@1234"
// }