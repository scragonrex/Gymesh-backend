import { compareSync } from "bcrypt";
import express from "express";
import { login, signup } from "../functions/auth.js";
const router = express.Router();
router.post('/login', login);
router.post('/signup', signup);
export default router;