import express from "express";
import {
  getUserInfo,
  login,
  signup,
  updateProfile,
  removeProfileImage,
  updateProfileImage,
  logout
} from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js"
import multer from "multer"

const upload = multer({dest:"uploads/profiles/"})
const router = express.Router();

router.post("/signup", signup); 
router.post("/login", login);
router.post("/logout", logout);
router.get("/user-info", verifyToken, getUserInfo);
router.post(
  "/update-profile",
  verifyToken,
  updateProfile
);

router.post("/update-profile-image",verifyToken ,upload.single("profile-image"), updateProfileImage)
router.delete("/remove-profile-image", verifyToken, removeProfileImage )

export default router;
