import express from "express";
import { addScore, createGoal, getGoals } from "../functions/goal.js";
import { verifyToken } from "../middleware/index.js";
const router = express.Router();
router.post('/createGoal',verifyToken,createGoal);
router.get('/:id',verifyToken,getGoals);
router.post('/addScore/:id',verifyToken,addScore);

export default router;