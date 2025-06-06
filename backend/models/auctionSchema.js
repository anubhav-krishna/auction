import mongoose from "mongoose";

const auctionSchema= new mongoose.Schema({
       title: String,
       description: String,
       category: String,
         condition: {
        type: String,
        enum: ["New", "Used"],
        default: "New"
       },
       startingBid: Number,
       currentBid: {
        type: Number,
        default:0
       },
       startTime: String,
       endTime:String,
       image: {
        public_id:{
            type:String,
            required: true
        },
        url:{
            type:String,
            required: true
        }
       },
       createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
       },
       bids:[
        {
            userId:{
             type: mongoose.Schema.Types.ObjectId,
            ref:"Bid",
            },
            username:String,
            profileImage:String,
            amount:Number
        }
       ],
       highestBidder:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
       },
       commissionCalculated:{
        type:Boolean,
        default:false
       }
 },{timestamps:true}
)

export const Auction= mongoose.model("Auction",auctionSchema);
