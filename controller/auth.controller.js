import mongoose from 'mongoose'
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();
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

        const salt = await bycrpt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await user.create([{name, email, password:hashedPassword}], {session})
        const token = jwt.sign({
            
        })


        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

}

export const login = async (req, res) => {


}

export const signOut = async (req, res) => {


}