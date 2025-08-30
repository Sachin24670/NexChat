import express from "express";
import {
  getUserInfo,
  login,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", login);
router.get("/user-info", verifyToken, getUserInfo);
router.post("/update-profile",verifyToken , updateProfile)

export default router;
