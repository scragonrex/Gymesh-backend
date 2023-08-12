import Goal from "../models/Goal.js";
import User from "../models/User.js";

export const createGoal = async (req, res) => {
    try {
        const { userId, startDate, progress, excercise, frequency } = req.body;
        console.log(req.body);
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        else {
            const goal = user.goals.find((item)=>item.excercise==excercise)

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
                res.status(201).json({status:"success",message:"goal created successfully"});
            }
        }

    } catch (err) {
        res.status(404).json(err.message);
    }
}

export const getGoals = async(req,res)=>{
    try {
        const goals = await Goal.find();
        console.log(goals)
        if(goals)
        {
            return res.status(200).json(goals)
        }
       
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({status:"error", message:"Internal server error"})
    }
}

export const addScore = async(req,res)=>{
    try {
        const {id} = req.params;
        const {score, newProgress, goalId}= req.body;
        const user = await User.findById(id);

        if(user)
        {
            const newScore = score + user.score;
            const goal = await Goal.findById(goalId);
            const output1 = await user.updateOne({score:newScore});
            goal.progress = newProgress;
            const output2 = await goal.save();

            console.log(output1,output2);
            return res.status(200).json({status:"success", msg:"Goal submitted successfully", score:newScore})
        }
        else
        return res.status(500).json({status:"error", msg:"Internal server error"})
        
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({status:"error", message:"Internal server error"})
    }
}