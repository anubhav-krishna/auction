import express from "express";
import { verifyJWT, isAuthorized } from "../middlewares/auth.middleware.js";
import { removeFromAuction,getAllPaymentProofs,
    getAllPaymentProofDetail,updateProofStatus,deletePaymentProof,
    fetchAllUsers,
    monthlyRevenue
 } from "../controllers/superAdminController.js";

 const router = express.Router();

 router.delete("/auctionitem/delete/:id", verifyJWT, isAuthorized("Super Admin"), removeFromAuction);

router.get("/paymentproofs/getall", verifyJWT, isAuthorized("Super Admin"), getAllPaymentProofs);

router.get("/paymentproof/:id", verifyJWT, isAuthorized("Super Admin"), getAllPaymentProofDetail);

router.post("/paymentproof/status/update/:id", verifyJWT, isAuthorized("Super Admin"), updateProofStatus);

router.delete("/paymentproof/delete/:id", verifyJWT, isAuthorized("Super Admin"), deletePaymentProof);

router.get("/users/getall", verifyJWT, isAuthorized("Super Admin"),fetchAllUsers);

router.get( "/monthlyincome",verifyJWT,isAuthorized("Super Admin"),monthlyRevenue);

export default router;