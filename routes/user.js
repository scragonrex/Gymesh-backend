import express from "express"
import { addReview, addUserInfo, getLeaderBoardScore, getReviews, getUserGoalsInfo } from "../functions/user.js";
import { verifyToken } from "../middleware/index.js";
const router = express.Router();

router.post('/addProfile',verifyToken, addUserInfo);
router.get('/getLeaderBoard',verifyToken,getLeaderBoardScore);
router.get('/getUserGoalsInfo',verifyToken,getUserGoalsInfo);
router.get('/getReviews',getReviews);
router.post('/addReview',addReview);
export default router;