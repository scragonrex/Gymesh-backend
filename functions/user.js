import Review from "../models/Review.js";
import User from "../models/User.js";

export const addUserInfo = async(req,res)=>{
    try {
        const {name, weight, age, gender} = req.body;
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user)
        {
            return res.status(404).send("User not found");
        }
        else if(user._id.toString()!==id)
        {
            return res.status(401).send("Not allowed");
        }
        else
        {
            const updatedDetails = {};
            if(name)
            updatedDetails.name = name;
            if(weight)
            updatedDetails.weight = weight;
            if(age)
            updatedDetails.age = age;
            if(gender)
            updatedDetails.gender = gender;

            const updatedUser = await User.findByIdAndUpdate(id,{$set:updatedDetails},{new:true});
            return res.status(200).json({status:"success", message:"Edited user successfully"});
        }

    } catch (err) {
        return res.status(404).json({status:"error", message:"Internal server error"});
    }
}

export const getLeaderBoardScore = async(req,res)=>{
    
    try {
        const users = await User.find();
        if(users)
        {
            users.sort((a,b)=>
            {
                return b.score-a.score;
            });
            const temp = users.map((item)=>{
                return {
                    name:item.name,
                    score:item.score
                }
            })
            return res.status(200).json({
                status:"success",
                users:temp,
            })
        } 
    } catch (err) {
        return res.status(404).json({status:"error", message:"Internal server error"});
    }
}

export const addReview = async(req,res)=>{
    try {
        console.log(req.body);
        const {rname, rdesignation, review} = req.body;
        const newReview = new Review({
            name:rname,designation:rdesignation,review
        });
        const output = await newReview.save();
        console.log(output);
        return res.status(201).json({status:"success",message:"Thank you for taking the time to review"});
    } catch (err) {
        return res.status(404).json({status:"error", message:"Internal server error"});
    }
}
export const getReviews = async(req,res)=>{
    try {
        const reviews = await Review.find();
        return res.status(200).json({status:"success",reviews:reviews});
    } catch (err) {
        return res.status(404).json({status:"error", message:"Internal server error"});
    }
}