// middlewares/authenticate.js

import ErrorHandler from "../Utils/errorHandling.js";
import User from '../models/userModel.js';
import Seller from '../models/sellerModel.js';
import catchAsyncError from "./catchAsyncError.js";
import jwt from 'jsonwebtoken';

export const isAuthenticatedUser = catchAsyncError(async (req , res , next) => {
    const { token } = req.cookies;
    if(!token) return next(new ErrorHandler('Login First',401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) return next(new ErrorHandler("User not found", 404));
    next();
});

export const isAuthenticatedSeller = catchAsyncError(async (req , res , next) => {
    const { token } = req.cookies;
    if(!token) return next(new ErrorHandler('Login First',401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.seller = await Seller.findById(decoded.id);
    next();
});

export const authorizeRoles = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(new ErrorHandler(`Role ${req.user.role} not allowed`,401));
    }
    next();
};

export const authorizeRolesSeller = (...roles) => (req, res, next) => {
    if (!roles.includes(req.seller.role)) {
        return next(new ErrorHandler(`Seller ${req.seller.role} not allowed`,401));
    }
    next();
};
