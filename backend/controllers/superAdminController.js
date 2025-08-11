import {asynchandler} from "../utils/asynchandler.js"; 
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Commission } from "../models/commissionSchema.js";
import { PaymentProof } from "../models/commissionProofSchema.js";
import { User } from "../models/userSchema.js";
import mongoose from "mongoose";
import { Auction } from "../models/auctionSchema.js";


export const removeFromAuction = asynchandler(async (req, res, next) => {
    const { id } = req.params;
   if(!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ApiError("Invalid Auction ID Format", 400));    
   }
    
    const auctionItem = await Auction.findById(id);
    if (!auctionItem) {
        return next(new ApiError("Auction item not found", 404));
    }
    await auctionItem.deleteOne();
    return res.status(200).json(new ApiResponse("Auction item removed successfully"));
});

export const getAllPaymentProofs = asynchandler(async (req, res, next) => {
    let paymentProofs = await PaymentProof.find();
    res.status(200).json(new ApiResponse(paymentProofs,200,"Payment proofs fetched successfully"));
})

export const getAllPaymentProofDetail = asynchandler(async (req, res, next) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ApiError("Invalid Payment Proof ID Format", 400));    
    }
    
    const paymentProof = await PaymentProof.findById(id);
    if (!paymentProof) {
        return next(new ApiError("Payment proof not found", 404));
    }
    
    res.status(200).json(new ApiResponse(paymentProof, 200, "Payment proof details fetched successfully"));
})

export const updateProofStatus = asynchandler(async (req, res, next) => {
    const { id } = req.params;
    const { status,amount } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ApiError("Invalid Payment Proof ID Format", 400));
    }

    let proof = await PaymentProof.findById(id);
    if (!proof) {
        return next(new ApiError("Payment proof not found", 404));
    }
    proof = await PaymentProof.findByIdAndUpdate(id, { status, amount }, { new: true,
        runValidators: true,
        useFindAndModify: false });


    res.status(200).json(new ApiResponse(proof, 200, "Payment proof status updated successfully"));
})

export const deletePaymentProof = asynchandler(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ApiError("Invalid Payment Proof ID Format", 400));
    }

    const proof = await PaymentProof.findById(id);
    if (!proof) {
        return next(new ApiError("Payment proof not found", 404));
    }

    await proof.deleteOne();
    res.status(200).json(new ApiResponse("Payment proof deleted successfully"));
});

export const fetchAllUsers= asynchandler(async (req, res, next) => {
  const users = await User.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $month: "$createdAt" },
          role: "$role",
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        month: "$_id.month",
        year: "$_id.year",
        role: "$_id.role",
        count: 1,
        _id: 0,
      },
    },
    {
      $sort: { year: 1, month: 1 },
    },
  ])



  const bidders = users.filter((user) => user.role === "Bidder");
  const auctioneers = users.filter((user) => user.role === "Auctioneer");

  const tranformDataToMonthlyArray = (data, totalMonths = 12) => {
    const result = Array(totalMonths).fill(0);
    data.forEach((item) => {
      result[item.month - 1] = item.count;
    });

    return result;
  };
  const biddersArray = tranformDataToMonthlyArray(bidders);
  const auctioneersArray = tranformDataToMonthlyArray(auctioneers);
    res.status(200).json(new ApiResponse({
        bidders: biddersArray,
        auctioneers: auctioneersArray
    }, 200, "Users fetched successfully"));
});

export const monthlyRevenue = asynchandler(async (req, res, next) => {
    const payments = await Commission.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        totalAmount: { $sum: "$amount" },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  const tranformDataToMonthlyArray = (payments, totalMonths = 12) => {
    const result = Array(totalMonths).fill(0);

    payments.forEach((payment) => {
      result[payment._id.month - 1] = payment.totalAmount;
    });

    return result;
  };

  const totalMonthlyRevenue = tranformDataToMonthlyArray(payments);
    res.status(200).json(new ApiResponse(totalMonthlyRevenue, 200, "Monthly revenue fetched successfully"));
});