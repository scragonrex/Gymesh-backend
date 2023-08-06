import mongoose from "mongoose";
import express from "express"
import { addUserInfo } from "../functions/user.js";
import { verifyToken } from "../middleware/index.js";
import { createGoal } from "../functions/goal.js";
const router = express.Router();

router.post('/addProfile/:id',verifyToken, addUserInfo);
router.post('/goal',verifyToken,createGoal);
export default router;