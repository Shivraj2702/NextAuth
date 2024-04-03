import mongoose, { Schema, modelNames } from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, "provide a username"],
        unique: true
    },
    email : {
        type: String,
        required: [true, "provide a email"],
        unique: true
    },
    password : {
        type: String,
        required: [true, "provide a password"],     
    },
    isVerified : {
        type : Boolean,
        default: false,
    },
    isAdmin : {
        type : Boolean,
        default: false,  
    },

    forgotPasswordToken : String,
    forgotPasswordTokenExpiry: Date,
    verifyToken : String,
    verifyTokenExpiry : Date,

})

const User =  mongoose.Model.users || mongoose.model("users", userSchema)

export default User