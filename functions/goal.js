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
                res.status(201).json(savedGoal);
            }
        }

    } catch (err) {
        res.status(404).json(err.message);
    }

}