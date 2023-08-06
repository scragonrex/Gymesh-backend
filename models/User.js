import mongoose from "mongoose";
const UserScheme = new mongoose.Schema({
    name:String,
    weight:Number,
    age:Number,
    gender:String,
    email:String,
    password:String,
    muscleScore:Number
}, {timestamps:true});

const User = mongoose.model("User", UserScheme);
export default User;
