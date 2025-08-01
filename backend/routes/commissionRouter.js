import express from "express";
import { proofOfCommission } from "../controllers/commissionController.js";
import { verifyJWT, isAuthorized } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/proof", verifyJWT, isAuthorized("Auctioneer"), proofOfCommission);

export default router;