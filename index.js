import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import authRoute from './routes/auth.js';
import profileRoute from './routes/user.js'
import goalRoute from './routes/goal.js';
import User from './models/User.js';
import Goal from './models/Goal.js';
const app = express();
app.use(express.json()); //to recieve the data in json format
app.use(cors());
const port = process.env.PORT || 5000;
dotenv.config();

//Routes
app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/goals", goalRoute);
// app.post("/login",login);
// app.use("/profile", );

const getUserGoalsInfo = async (req, res) => {

    // const id = req.user.id;
    const id = '64dcb36a12e05cecc7e1932f';
    const goals = await Goal.find({ userId: id });
    let completedGoals = [];
    let progressGoals = [];
    goals.forEach((item) => {
        if (item.progressValue === 100)
            completedGoals.push(item);
        else
            progressGoals.push(item);
    })

    console.log("completedGoals",completedGoals,"progressGoals", progressGoals);

}

// getUserGoalsInfo();
//Mongodb configuration
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
        console.log('mongoDb connected')
    }))
    .catch((error) => console.log(`${error} did not connect`));