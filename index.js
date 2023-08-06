import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import authRoute from './routes/auth.js';
import profileRoute from './routes/user.js'
import goalRoute from './routes/goal.js';
const app = express();
app.use(express.json()); //to recieve the data in json format
app.use(cors());
const port = process.env.PORT || 5000;
dotenv.config();

//Routes
app.use("/auth", authRoute);
app.use("/profile",profileRoute);
app.use("/goals",goalRoute);
// app.post("/login",login);
// app.use("/profile", );

//Mongodb configuration
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
    console.log('mongoDb connected')
}))
.catch((error)=>console.log(`${error} did not connect`));