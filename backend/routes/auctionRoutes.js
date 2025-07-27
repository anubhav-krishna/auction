import { addNewAuctionItem, getAllAuctionItems, getAuctionDetails,republishItem,removeFromAuction, getMyAuctionItems } from "../controllers/auctionItemController.js"; 
import express from "express";
import { verifyJWT ,isAuthorized} from "../middlewares/auth.middleware.js";
import { get } from "mongoose";
import { trackCommissionStatus } from "../middlewares/trackCommissionStatus.js";
const router = express.Router();
router.post("/add", verifyJWT,isAuthorized("Auctioneer"),trackCommissionStatus,addNewAuctionItem);
router.get("/allitems",getAllAuctionItems)
router.get("/myitems", verifyJWT, getMyAuctionItems);
router.get("/details/:id", verifyJWT, getAuctionDetails);
router.delete("/delete/:id", verifyJWT, isAuthorized("Auctioneer"), removeFromAuction);
router.put("/republish/:id", verifyJWT, isAuthorized("Auctioneer"), republishItem);

export default router;