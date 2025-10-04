// authController.js
import catchAsyncError from '../middlewares/catchAsyncError.js';
import User from '../models/userModel.js';
import sendEmail from '../Utils/email.js';
import ErrorHandler from '../Utils/errorHandling.js';
import sendToken from '../Utils/jwt.js';
import crypto from 'crypto';

// Register User - /api/v1/register
export const registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password, shippingAddress, billingAddress, wishlist, notificationPreferences, feedbacks, productsInterested } = req.body;

    let avatar;
    if (req.file) {
        avatar = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`;
    }

    const user = await User.create({
        name,
        email,
        password,
        avatar,
        shippingAddress,
        billingAddress,
        wishlist,
        notificationPreferences,
        feedbacks,
        productsInterested
    });

    sendToken(user, 201, res);
});

// Login User - /api/v1/login
export const loginuser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.isValidPassword(password))) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 201, res);
});

// Initiate 2FA - /api/v1/send2FA
export const initiate2FA = catchAsyncError(async (req, res, next) => {
    if (!req.user || !req.user._id) {
        return next(new ErrorHandler('User authentication required', 401));
    }

    const user = await User.findById(req.user._id);
    if (!user) return next(new ErrorHandler('User not found', 404));

    const code = crypto.randomInt(100000, 999999).toString();
    user.twoFACode = code;
    user.twoFAExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    user.is2FAVerified = false;

    await user.save({ validateBeforeSave: false });

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your 2FA Verification Code',
            message: `Your verification code is: ${code}`
        });

        res.status(200).json({
            success: true,
            message: '2FA code sent to your email'
        });
    } catch (error) {
        user.twoFACode = undefined;
        user.twoFAExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler('Failed to send verification email', 500));
    }
});

// Verify 2FA - /api/v1/verfy2FA
export const verify2FA = catchAsyncError(async (req, res, next) => {
    const { code } = req.body;

    if (!code || !/^\d{6}$/.test(code)) {
        return next(new ErrorHandler('Please provide a valid 6-digit code', 400));
    }

    const user = await User.findById(req.user._id);
    if (!user) return next(new ErrorHandler('User not found', 404));

    if (!user.twoFACode || code !== user.twoFACode || Date.now() > user.twoFAExpires) {
        return next(new ErrorHandler('Invalid or expired verification code', 400));
    }

    user.twoFACode = undefined;
    user.twoFAExpires = undefined;
    user.is2FAVerified = true;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: '2FA verification successful',
        user
    });
});

// Logout User - /api/v1/logout
export const logoutUser = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).status(200).json({
        success: true,
        message: "Logged out"
    });
};

// Forgot Password - /api/v1/password/forgot
export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new ErrorHandler('User not found with this email', 404));

    const resetToken = await user.getResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message = `Your password reset URL is: \n\n${resetUrl}\n\nIf you did not request this, ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'RuralCraft Password Recovery',
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset Password - /api/v1/password/reset/:token
export const resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: { $gt: Date.now() }
    });

    if (!user) return next(new ErrorHandler('Password reset token is invalid or expired', 400));
    if (req.body.password !== req.body.confirmPassword) return next(new ErrorHandler('Passwords do not match', 400));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });

    sendToken(user, 201, res);
});

// Get User Profile - /api/v1/myprofile
export const getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
});

// Change Password - /api/v1/password/change
export const changePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    if (!await user.isValidPassword(req.body.oldPassword)) {
        return next(new ErrorHandler('Old Password is incorrect', 401));
    }

    user.password = req.body.password;
    await user.save();

    res.status(200).json({ success: true });
});

// Update Profile - /api/v1/update
export const updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        shippingAddress: req.body.shippingAddress,
        billingAddress: req.body.billingAddress,
        wishlist: req.body.wishlist,
        notificationPreferences: req.body.notificationPreferences,
        feedbacks: req.body.feedbacks,
        productsInterested: req.body.productsInterested
    };

    if (req.file) newUserData.avatar = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`;

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, user });
});

// Delete My Account - /api/v1/deleteMyAccount
export const deleteMyAccount = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) return next(new ErrorHandler('User not found', 404));

    await user.deleteOne();
    res.status(200).json({ success: true, message: 'Your account has been deleted successfully' });
});

// Admin: Get all users - /api/v1/admin/users
export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ success: true, users });
});

// Admin: Get specific user - /api/v1/admin/user/:id
export const getUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorHandler(`User not found with id ${req.params.id}`, 404));
    res.status(200).json({ success: true, user });
});

// Admin: Update user - /api/v1/admin/user/:id
export const updateUser = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, user });
});

// Admin: Delete user - /api/v1/admin/user/:id
export const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorHandler(`User not found with id ${req.params.id}`, 404));

    await user.deleteOne();
    res.status(200).json({ success: true });
});

// Get all buyers - /api/v1/buyers
export const getAllBuyers = catchAsyncError(async (req, res, next) => {
    const { name } = req.query;
    let query = {};
    if (name) query.name = { $regex: name, $options: 'i' };

    const buyers = await User.find(query).select('name email shippingAddress billingAddress').sort({ name: 1 });
    res.status(200).json({ success: true, buyers });
});
