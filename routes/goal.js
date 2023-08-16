import express from "express";
import { addScore, createGoal, deleteGoal, getGoals } from "../functions/goal.js";
import { verifyToken } from "../middleware/index.js";
const router = express.Router();
router.post('/createGoal',verifyToken,createGoal);
router.get('/getGoals',verifyToken,getGoals);
router.post('/addScore',verifyToken,addScore);
router.delete('/deleteGoal',verifyToken,deleteGoal);
export default router;