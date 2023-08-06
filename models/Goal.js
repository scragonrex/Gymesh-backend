import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    userId:String,
    startDate:Date,
    excercise:String,
    frequency:String,
    progress:{type:Number, default:0}
});

const Goal = mongoose.model("Goal", goalSchema);
export default Goal;