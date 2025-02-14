import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'User name is required'],
        minLength:2,
        maxLength:50,
    },

    email:{
        type:String,
        required:[true,'Email is needed'],
        unique:true,
        minLength:10,
        maxLength:255,
    },

    
    password:{
        type:String,
        required:[true,"Password is reqired"],
        unique:true,
        minLength:8,
        maxLength:20,
    }



},{timestamps:true});

const User = Mongoose.model('User',userSchema);

export default User;