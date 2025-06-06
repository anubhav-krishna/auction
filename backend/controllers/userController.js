import { User } from "../models/userSchema.js";
import {asynchandler} from "../utils/asynchandler.js"; 
import {ApiError} from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { register } from "module";
 
export const generateAccessandRefreshToken=  async(userId)=>{
    try{
      const user=await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
         user.refreshToken=refreshToken
         await user.save({validateBeforeSave:false})
            return {accessToken, refreshToken}
    }
    catch(error){
        throw new ApiError("Error generating access tokens", 500)

    }
}

export const regeisterUser = asynchandler(async (req, res,next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ApiError("No files were uploaded.", 400));
    }
 const {profileImage} = req.files;

 const allowedFortmats= ["image/jpg", "image/jpeg", "image/png","image/webp"];
    if(!allowedFortmats.includes(profileImage.mimetype)) {
        return next(new ApiError("Invalid image format", 400));
    }

    const {username, 
           email,
           password,
           address,
           phone,
           role,
           bankAccountNumber,
           bankAccountName,
           bankName,
           upiId} = req.body;
   
    if(!username || !email || !password || !address || !phone || !role) {
        return next(new ApiError("Please fill all the fields", 400));
    }
    if(role == "Auctioneer" ) {
        if(!bankAccountNumber || !bankAccountName || !bankName) {
            return next(new ApiError("Please provide all the banking details", 400));
        }
        if(!upiId) {
            return next(new ApiError("Please provide UPI ID", 400));
        }
    }
    const existingUser = await User.findOne({email});
    if(existingUser) {
        return next(new ApiError("User already exists", 400));
    }
    const cloudinaryResponse = await uploadOnCloudinary(profileImage.tempFilePath, "profile");
    if(!cloudinaryResponse) {
        return next(new ApiError("Error uploading profile image", 500));
    }
    const user = await User.create({
        username,
        email,
        password,
        address,
        phone,
        profileImage: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        },
        paymentMethods: {
            bankTransfer: {
                bankAccountNumber,
                bankAccountName,
                bankName
            },
            upiId
        },
        role
    });
    if(!user) {
        return next(new ApiError("Error creating user", 500));
    }
     const {accessToken, refreshToken}= await generateAccessandRefreshToken(user._id)

              const registeredUser= await  User.findByIdAndUpdate(user._id).select("-password -refreshToken")

              const options={
                httpOnly:true,
                secure:true,
              }
                return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(new ApiResponse({
                    user:registeredUser,
                    accessToken,
                    refreshToken
                }, 200, "User registered in successfully"))
});

export const loginUser= asynchandler(async (req, res) => {
            const {email,username,password}=req.body
            if(!username && !email){
                throw new ApiError("Please provide username or email", 400)
            }
           const user= await User.findOne({$or:[{username}, {email}]
           })
              if(!user){
                throw new ApiError("User does not exist", 404)
              }
             const validPass= await user.isPasswordCorrect(password)
                if(!validPass){
                    throw new ApiError("Password is incorrect", 401)
                }
                const {accessToken, refreshToken}= await generateAccessandRefreshToken(user._id)

              const loggedInUser= await  User.findByIdAndUpdate(user._id).select("-password -refreshToken")

              const options={
                httpOnly:true,
                secure:true,
              }
                return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(new ApiResponse({
                    user:loggedInUser,
                    accessToken,
                    refreshToken
                }, 200, "User logged in successfully"))
})

export const logoutUser= asynchandler(async (req, res) => {
   User.findByIdAndUpdate(
    req.user._id, {
          $set:{
            refreshToken: undefined
          }
   },
   {
    new:true
 }
)
const options={
    httpOnly:true,
    secure:true,
  }
  return res.status(200)
  .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(null, 200, "User logged out successfully"))
})

export const getProfile= asynchandler(async (req, res) => {
      return res.status(200)
    .json(new ApiResponse(req.user, 200, "User fetched successfully"))
})

export const fetchLeaderboard= asynchandler(async (req, res) => {  
    const users = await User.find({moneySpent: {$gt:0}});
    const leaderboard =users.sort ((a,b)=>b.moneySpent-a.moneySpent);
    res.status(200).json(new ApiResponse(leaderboard,200,"Leaderboard fetched successfully"))
})