import {asynchandler} from "../utils/asynchandler.js"; 
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Auction} from "../models/auctionSchema.js";
import { Bid } from "../models/bidSchema.js";
import { User } from "../models/userSchema.js";

export const placeBid = asynchandler(async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  const auctionItem = await Auction.findById(id);
  if (!auctionItem) throw new ApiError(404, "Auction Item not found.");
  if (!amount) throw new ApiError(400, "Please place your bid.");
  if (amount <= auctionItem.currentBid)
    throw new ApiError(400, "Bid must be higher than current bid.");
  if (amount < auctionItem.startingBid)
    throw new ApiError(400, "Bid must be greater than starting bid.");

  const existingBid = await Bid.findOne({
    "bidder.id": req.user._id,
    auctionItem: auctionItem._id,
  });

  const existingBidInAuction = auctionItem.bids.find(
    (bid) => bid.userId.toString() === req.user._id.toString()
  );

  if (existingBid && existingBidInAuction) {
    existingBid.amount = amount;
    existingBidInAuction.amount = amount;
    await existingBid.save();
  } else {
    const user = await User.findById(req.user._id);
    const newBid = await Bid.create({
      amount,
      bidder: {
        id: user._id,
        userName: user.userName,
        profileImage: user.profileImage?.url,
      },
      auctionItem: auctionItem._id,
    });

    auctionItem.bids.push({
      userId: user._id,
      userName: user.userName,
      profileImage: user.profileImage?.url,
      amount,
    });
  }

  auctionItem.currentBid = amount;
  await auctionItem.save();

  return res.status(201).json(
    new ApiResponse(201, {
      message: "Bid placed.",
      currentBid: auctionItem.currentBid,
    })
  );
});
