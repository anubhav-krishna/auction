import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({ 
    username:{
        type: String,
        minLength: [3, "Username must be at least 3 characters"],
        maxLength: [20, "Username must be at most 20 characters"]
    },
    password:{
        type: String,
        minLength: [8, "Password must be at least 6 characters"],
        maxLength: [32, "Password must be at most 32 characters"]
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    address:{
        type: String,
    },
    phone:{
        type: String,
        minLength: [10, "Phone number must be exact 10 characters"],
        maxLength: [10, "Phone number must be exact 10 characters"]
    },
    profileImage:{
      public_id: {
        type: String,
       required: true,
      },
        url: {
            type: String,
            required: true,
        },
    },
    paymentMethods: {
       bankTransfer: {
           bankAccountNumber: {
               type: String,
           },
           bankAccountName: String,
              bankName: String
        },
        upiId:{
            type:String
        }
    },
    role: {
        type: String,
        enum: ["Auctioneer", "Bidder", "SuperAdmin"],
    },
    unpaidCommission: {
        type: Number,
        default: 0,
    },
    auctionsWon: {
        type: Number,
        default: 0,
    },
    moneySpent: {
        type: Number,
        default: 0,
    },

 },{timestamps: true});

 userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
     this.password = await bcrypt.hashSync(this.password, 10);
     next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id
    },
    process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d"
    })
};
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "30d"
    })
};


export const User = mongoose.model("User", userSchema);