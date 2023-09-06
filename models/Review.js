import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name:String,
    designation:String,
    review:String,
    rating:Number
})

const Review = mongoose.model("Review",reviewSchema);
export default Review;