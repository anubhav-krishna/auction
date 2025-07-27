import express from "express";
import { placeBid } from "../controllers/bidController.js";    
import { verifyJWT ,isAuthorized} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/place/:id", verifyJWT, isAuthorized("Bidder"), placeBid);

export default router;
