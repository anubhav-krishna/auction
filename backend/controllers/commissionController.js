import { User } from "../models/userSchema.js";
import { PaymentProof } from "../models/commissionProofSchema.js";
import {asynchandler} from "../utils/asynchandler.js"; 
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const proofOfCommission = asynchandler(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ApiError("Payment proof Screenshot required", 400));
    }
    const { proof } = req.files;
    const {amount, comment} = req.body;
     if(!amount || !comment) {
        return next(new ApiError("Please provide amount and comment", 400));
    }
    const user= await User.findById(req.user._id);
   if(!user) {
        return next(new ApiError("User not found", 404));
    }
    if(user.unpaidCommission==0){
        return res.status(200).json(new ApiResponse("No unpaid commission found", true));
    }
    if(user.unpaidCommission < amount) {
       return next(new ApiError(`Amount exceeds unpaid commission. Please enter amount upto ${user.unpaidCommission}`, 403));
    }
  const allowedFortmats = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
    if (!allowedFortmats.includes(proof.mimetype)) {
        return next(new ApiError("Invalid image format", 400));
    }

    const cloudinaryResponse = await uploadOnCloudinary(proof.tempFilePath, "commissionProof");
    if (!cloudinaryResponse) {
        return next(new ApiError("Error uploading proof to cloud", 500));
    }

    const paymentProof = await PaymentProof({
        userId: req.user._id,
        proof: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
        amount,
        comment,
    });
    await paymentProof.save();
    res.status(201).json(new ApiResponse("Your proof has been submitted successfully. We will review it and respond within 24 hours", true, paymentProof));
    
})