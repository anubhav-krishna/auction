import {asynchandler} from  "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const verifyJWT = asynchandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        // console.log("Token received:", token);

        if (!token) {
            throw new ApiError("Unauthorized access", 401);
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("Decoded token:", decodedToken);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError("Invalid Access Token", 401);
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError("Token has expired", 401);
        }
        console.error("Error verifying token:", error);
        throw new ApiError("Invalid Access Token", 401);
    }
});

export const isAuthorized = (...roles) => {
    return (req, _, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError("You are not authorized to perform this action", 403));
        }
        next();
    };
}