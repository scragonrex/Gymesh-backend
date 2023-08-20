import express from "express"
import { addUserInfo, getLeaderBoardScore } from "../functions/user.js";
import { verifyToken } from "../middleware/index.js";
import { createGoal } from "../functions/goal.js";
const router = express.Router();

router.post('/addProfile',verifyToken, addUserInfo);
router.get('/getLeaderBoard',verifyToken,getLeaderBoardScore);
export default router;