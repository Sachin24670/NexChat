import express from "express";
import { getUserInfo, login, signup } from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", login);
router.get("/user-info", verifyToken, getUserInfo);

export default router;
