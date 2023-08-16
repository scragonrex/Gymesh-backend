import Goal from "../models/Goal.js";
import User from "../models/User.js";

export const getGoals = async(req,res)=>{
    try {
        const goals = await Goal.find();
        if(goals)
        {
            return res.status(200).json(goals)
        }
       
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({status:"error", message:"Internal server error"})
    }
}

export const createGoal = async (req, res) => {
    try {
        const { userId, startDate, progress, excercise, frequency } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        else {
            const goal = user.goals.find((item)=>item.excercise==excercise)

            if (goal)
                res.status(405).json({status:"error",msg:"Excercise already exist"});
            else {

                const newGoal = new Goal({
                    userId,
                    startDate,
                    progress,
                    excercise,
                    frequency
                });
                const savedGoal = await newGoal.save();
                const newGoals= user.goals.concat({excerciseId:savedGoal._id.toString(),excercise:savedGoal.excercise});
                const output = await user.updateOne({goals:newGoals})
                res.status(201).json({status:"success",msg:"Goal created successfully"});
            }
        }

    } catch (err) {
        console.log(err.message)
        res.status(500).json({status:"error",msg:"Internal server error"});
    }
}

export const deleteGoal = async(req,res)=>{
    try {
        const id = req.user.id;
        const {goalId} = req.body;
        const user = await User.findById(id);
        if(!user)
        return res.status(403).json({status:"error",msg:"Not Allowed"});
    const output1 = await Goal.findByIdAndDelete(goalId);
    const updatedGoals = user.goals.filter((item)=>item.excerciseId!==goalId);
    console.log("updated goals",updatedGoals);
    const output2 = await user.updateOne({goals:updatedGoals});
    return res.status(200).json({status:"success",msg:"Goal deleted successfully"});

    } catch (err) {
        console.log(err.message)
        res.status(500).json({status:"error",msg:"Internal server error"});
    }
}



export const addScore = async(req,res)=>{
    try {
        const id = req.user.id;
        const {score, newProgress, goalId}= req.body;
        const user = await User.findById(id);

        if(user)
        {
            const newScore = score + user.score;
            const goal = await Goal.findById(goalId);
            const output1 = await user.updateOne({score:newScore});
            goal.progress = newProgress;
            const output2 = await goal.save();

            return res.status(200).json({status:"success", msg:"Goal submitted successfully", score:newScore})
        }
        else
        return res.status(403).json({status:"error", msg:"Not Allowed"})
        
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({status:"error", message:"Internal server error"})
    }
}