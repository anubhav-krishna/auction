import { regeisterUser,loginUser,logoutUser,getProfile,fetchLeaderboard } from "../controllers/userController.js";
import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", regeisterUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT,logoutUser);
router.post("/me",verifyJWT, getProfile);
router.post("/leaderboard", fetchLeaderboard);

export default router;