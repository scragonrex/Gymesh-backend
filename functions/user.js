import User from "../models/User.js";

export const addUserInfo = async(req,res)=>{
    try {
        const {name, weight, age, gender} = req.body;
        const {id} = req.params;
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