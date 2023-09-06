import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

//Register or Signup
export const signup = async(req,res)=>{
    try {
        const {name, email, password} = req.body;
        let user = await User.findOne({email:req.body.email});
        if(user)
        {res.status(400).json({status:"error",msg:"The user already exists"});}
        else{
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password,salt);
    
            const newUser = new User({
                name,
                email,
                password:passwordHash
            });
    
            const savedUser = await newUser.save();
            res.status(201).json({status:"success", msg:"User created successfully", savedUser});
        }
       
    } catch (err) {
        console.log(err.message);
        res.status(500).json({status:"error",msg:"Internal server error"})
    }
}

//Login
export const login = async(req,res)=>{
   
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if(!user) return res.status(404).json({status:"error",msg:'User not found'});
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({status:"error",msg:'Incorrect password'});
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET);
        delete user.password;  //Check the response in the frontend that password is visible or not
        res.status(200).json({token,user});
    } catch (err) {
        console.log(err.message)
        res.status(500).json({status:"error",msg:'Internal server error'})
    }
}
