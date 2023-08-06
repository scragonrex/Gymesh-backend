import mongoose from "mongoose";
import express from "express"
import { addUserInfo } from "../functions/user.js";
import { verifyToken } from "../middleware/index.js";
const router = express.Router();

router.post('/addProfile/:id',verifyToken, addUserInfo);

export default router;