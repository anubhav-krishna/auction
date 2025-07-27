import { User } from "../models/userSchema.js";
import {ApiError} from "../utils/ApiError.js";
import {asynchandler} from "../utils/asynchandler.js"; 

//console.log("Track Commission Status Middleware Loaded");
export const trackCommissionStatus = asynchandler(async (req, res, next) => {
    const user= await User.findById(req.user._id);
    if (!user) {
        return next(new ApiError("User not found", 404));
    }
    
    if(user.unpaidCommission > 0) {
     return next(new ApiError("You have unpaid commission. Please pay them before posting new auction", 400));

    }
})