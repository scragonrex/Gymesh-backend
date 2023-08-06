import mongoose from "mongoose";
const UserScheme = new mongoose.Schema({
    name:String,
    weight:Number,
    age:Number,
    gender:String,
    email:String,
    password:String,
    score:{type:Number, default:0},
    goals:Array
}, {timestamps:true});

const User = mongoose.model("User", UserScheme);
export default User;
