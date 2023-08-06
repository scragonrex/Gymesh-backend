import Goal from "../models/Goal.js";
import User from "../models/User.js";

export const createGoal = async (req, res) => {
    try {
        const { userId, startDate, progress, excercise, frequency } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        else {
            const goal = await Goal.findOne({ excercise });

            if (goal)
                res.status(405).json("Excercise already exist");
            else {

                const newGoal = new Goal({
                    userId,
                    startDate,
                    progress,
                    excercise,
                    frequency
                });
                const savedGoal = await newGoal.save();
                const newGoals= user.goals.concat(savedGoal);
                const output = await user.updateOne({goals:newGoals})
                console.log(output);
                res.status(201).json(savedGoal);
            }
        }

    } catch (err) {
        res.status(404).json(err.message);
    }
}

export const getGoals = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(user)
        {
            return res.status(200).json(user.goals)
        }
       
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({status:"error", message:"Internal server error"})
    }
}

export const addScore = async(req,res)=>{
    try {
        const {id} = req.params;
        const {score}= req.body;
        const user = await User.findById(id);

        if(user)
        {
            const newScore = score + user.score;
            const output = await user.updateOne({score:newScore});
            console.log(output);
            return res.status(200).json({status:"success", message:"Added score"})
        }
        else
        return res.status(500).json({status:"error", message:"Internal server error"})
        
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({status:"error", message:"Internal server error"})
    }
}