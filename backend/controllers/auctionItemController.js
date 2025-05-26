import {asynchandler} from "../utils/asynchandler.js"; 
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Auction} from "../models/auctionSchema.js";
import {User} from "../models/userSchema.js";

export const addNewAuctionItem = asynchandler(async (req, res) => {
     if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ApiError("Auction item image is required.", 400));
    }
 const {image} = req.files;

 const allowedFortmats= ["image/jpg", "image/jpeg", "image/png","image/webp"];
    if(!allowedFortmats.includes(image.mimetype)) {
        return next(new ApiError("Invalid image format", 400));
    }

    const {description,
         startingBid,
          auctioneerId,
          title,
          condition,
          catergory,
            startTime,
            endTime,
            } = req.body;
        if(!description || !startingBid || !auctioneerId || !title || !condition || !catergory || !startTime || !endTime) {
            return next(new ApiError("All fields are required", 400));
        }    
       if(new Date(startTime) < new Date.now()) {
        return next(new ApiError("Start time must be ahead of front time", 400));
       }
         if(new Date(endTime) <= new Date(startTime)) {
          return next(new ApiError("End time must be ahead of start time", 400));
         }
         const alreadyOneAuctionActive= await Auction.findOne({
            createdBy: req.user._id,
            endTime: { $gte: new Date() }
         });
            if(alreadyOneAuctionActive) {
                return next(new ApiError("You already have an active auction", 400));
            }
            
})
