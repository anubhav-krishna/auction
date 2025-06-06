import {asynchandler} from "../utils/asynchandler.js"; 
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Auction} from "../models/auctionSchema.js";
import {User} from "../models/userSchema.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import mongoose, { mongo } from "mongoose";

export const addNewAuctionItem = asynchandler(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ApiError("Auction item image is required.", 400));
    }
    const { image } = req.files;

    const allowedFormats = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(image.mimetype)) {
        return next(new ApiError("Invalid image format", 400));
    }
    console.log(req.body);
    const {
        title,
        description,
        category, // fixed typo
        condition,
        startingBid,
        startTime,
        endTime
    } = req.body;
    if (!title || !description || !category || !condition || !startingBid || !startTime || !endTime) {
        return next(new ApiError("Please fill all the fields", 400));
    }
    if (new Date(startTime) < new Date()) {
        return next(new ApiError("Start time must be ahead of current time", 400));
    }
    if (new Date(endTime) <= new Date(startTime)) {
        return next(new ApiError("End time must be ahead of start time", 400));
    }
    const alreadyOneAuctionActive = await Auction.findOne({
        createdBy: req.user._id,
        endTime: { $gte: Date.now() }
    });
    if (alreadyOneAuctionActive) {
        return next(new ApiError("You already have an active auction", 400));
    }
    const uploadImage = await uploadOnCloudinary(image.tempFilePath, "auctionItems");
    if (!uploadImage) {
        return next(new ApiError("Failed to upload image", 500));
    }
    const auctionItem = await Auction.create({
        description,
        startingBid,
        createdBy: req.user._id,
        title,
        condition,
        category, // fixed typo
        startTime,
        endTime,
        image: {
            public_id: uploadImage.public_id,
            url: uploadImage.secure_url
        }
    });
    if (!auctionItem) {
        return next(new ApiError("Failed to create auction item", 500));
    }
    return res.status(201).json(new ApiResponse(`Auction item created successfully and will be listed on ${startTime}`, auctionItem));
});

export const getAllAuctionItems = asynchandler(async (req, res, next) => {
    let items= await Auction.find();
    res.status(200).json(new ApiResponse("All auction items fetched successfully", items));
});
export const getMyAuctionItems = asynchandler(async (req, res, next) => {
    const myAuctionItems = await Auction.find({ createdBy: req.user._id })
        .populate("createdBy", "username profileImage")
    
    if (!myAuctionItems || myAuctionItems.length === 0) {
        return next(new ApiError("You have no auction items", 404));
    }
    
    return res.status(200).json(new ApiResponse("Your auction items fetched successfully", myAuctionItems));
});
export const getAuctionDetails = asynchandler(async (req, res, next) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ApiError("Invalid Auction ID Format", 400));
    }
    const auctionItem = await Auction.findById(id)
    
    if (!auctionItem) {
        return next(new ApiError("Auction item not found", 404));
    }
    const bidders = auctionItem.bids.sort((a,b)=> b.bid - a.bid)
    return res.status(200).json(new ApiResponse("Auction item details fetched successfully", auctionItem,bidders));
});
export const removeFromAuction = asynchandler(async (req, res, next) => {
    const { id } = req.params;
   if(!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ApiError("Invalid Auction ID Format", 400));    
   }
    
    const auctionItem = await Auction.findById(id);
    if (!auctionItem) {
        return next(new ApiError("Auction item not found", 404));
    }
     if (auctionItem.createdBy.toString() !== req.user._id.toString()) {
        return next(new ApiError("You are not authorized to remove this auction item", 403));
    }
    await auctionItem.deleteOne();
    return res.status(200).json(new ApiResponse("Auction item removed successfully", null));
});
 
export const republishItem = asynchandler(async (req, res, next) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ApiError("Invalid Auction ID Format", 400));    
   }
    
    
    const auctionItem = await Auction.findById(id);
    if (!auctionItem) {
        return next(new ApiError("Auction item not found", 404));
    }
    
    // if (auctionItem.createdBy.toString() !== req.user._id.toString()) {
    //     return next(new ApiError("You are not authorized to republish this auction item", 403));
    // }
    
    if (new Date(auctionItem.endTime) > new Date()) {
        return next(new ApiError("Auction item is still active and cannot be republished", 400));
    }
    
    auctionItem.startTime = new Date();
    auctionItem.endTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Extend by one week
    auctionItem.bids = []; // Reset bids
    auctionItem.commissionCalculated= false; // Reset commission status
    const owner = await User.findById(auctionItem.createdBy);
     owner.unpaidCommission= 0; // Reset owner's unpaid commission
    await owner.save({validateBeforeSave: false});
    await auctionItem.save();
    
    return res.status(200).json(new ApiResponse("Auction item republished successfully", auctionItem));
});