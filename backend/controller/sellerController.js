import catchAsyncError from '../middlewares/catchAsyncError.js';
import Seller from '../models/sellerModel.js';
import sendEmail from '../Utils/email.js';
import ErrorHandler from '../Utils/errorHandling.js';
import sendToken from '../Utils/jwt.js';
import sendTokenSeller from '../Utils/jwtSeller.js';
import crypto from 'crypto';
import User from '../models/userModel.js';

// Register seller - /api/v1/registerSeller
export const registerSeller = catchAsyncError(async (req, res, next) => {
    const { name, email, password, businessName, businessAddress, storeLocation, businessRegistrationNo, acceptedPaymentMethods,
        customerReviews, commissionFees, productTypesSelling
    } = req.body;

    let avatar;
    if (req.file) {
        avatar = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`;
    }

    const seller = await Seller.create({
        name, email, password, avatar,
        businessName, businessAddress, storeLocation, businessRegistrationNo, acceptedPaymentMethods,
        customerReviews, commissionFees, productTypesSelling
    });

    sendTokenSeller(seller, 201, res);
});

// Initiate 2FA Seller
export const initiate2FASeller = catchAsyncError(async (req, res, next) => {
    if (!req.seller || !req.seller._id) {
        return next(new ErrorHandler('User authentication required', 401));
    }

    const seller = await Seller.findById(req.seller._id);
    if (!seller) return next(new ErrorHandler('User not found', 404));

    const code = crypto.randomInt(100000, 999999).toString();
    seller.twoFACode = code;
    seller.twoFAExpires = Date.now() + 10 * 60 * 1000; // 10 min
    seller.is2FAVerified = false;

    await seller.save({ validateBeforeSave: false });

    try {
        await sendEmail({
            email: seller.email,
            subject: 'Your 2FA Verification Code',
            message: `Your verification code is: ${code}`
        });

        res.status(200).json({
            success: true,
            message: '2FA code sent to your email'
        });
    } catch (error) {
        seller.twoFACode = undefined;
        seller.twoFAExpires = undefined;
        await seller.save({ validateBeforeSave: false });
        return next(new ErrorHandler('Failed to send verification email', 500));
    }
});

// Verify 2FA Seller
export const verify2FASeller = catchAsyncError(async (req, res, next) => {
    const { code } = req.body;
    if (!code || !/^\d{6}$/.test(code)) return next(new ErrorHandler('Please provide a valid 6-digit code', 400));

    const seller = await Seller.findById(req.seller._id);
    if (!seller) return next(new ErrorHandler('Seller not found', 404));

    if (!seller.twoFACode || code !== seller.twoFACode || Date.now() > seller.twoFAExpires) {
        return next(new ErrorHandler('Invalid or expired verification code', 400));
    }

    seller.twoFACode = undefined;
    seller.twoFAExpires = undefined;
    seller.is2FAVerified = true;
    await seller.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: '2FA verification successful',
        seller
    });
});

// Login Seller
export const loginSeller = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorHandler('Please Enter email & password', 400));

    const seller = await Seller.findOne({ email }).select('+password');
    if (!seller || !await seller.isValidPassword(password)) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendTokenSeller(seller, 201, res);
});

// Logout Seller
export const logoutSeller = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).status(200).json({
        success: true,
        message: "Logged out"
    });
};

// Forgot Password Seller
export const forgotPasswordSeller = catchAsyncError(async (req, res, next) => {
    const seller = await Seller.findOne({ email: req.body.email });
    if (!seller) return next(new ErrorHandler('Seller not found with this mail', 404));

    const resetToken = await seller.getResetToken();
    await seller.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/password/resetSeller/${resetToken}`;
    const message = `Your password reset url is as follows  \n\n ${resetUrl}  \n\n If you have not requested this E-mail then Ignore it`;

    try {
        await sendEmail({ email: seller.email, subject: 'Rootsly Password Recovery', message });
        res.status(200).json({ success: true, message: `Email Sent to ${seller.email}` });
    } catch (error) {
        seller.resetPasswordToken = undefined;
        seller.resetPasswordTokenExpire = undefined;
        await seller.save({ validateBeforeSave: false });
        next(new ErrorHandler(error.message), 500);
    }
});

// Reset Password Seller
export const resetPasswordSeller = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const seller = await Seller.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: { $gt: Date.now() }
    });

    if (!seller) return next(new ErrorHandler('Password reset token is invalid or expired'));
    if (req.body.password !== req.body.confirmPassword) return next(new ErrorHandler('Password does not match', 401));

    seller.password = req.body.password;
    seller.resetPasswordToken = undefined;
    seller.resetPasswordTokenExpire = undefined;
    await seller.save({ validateBeforeSave: false });

    sendTokenSeller(seller, 201, res);
});

// Get Seller Profile
export const getSellerProfile = catchAsyncError(async (req, res, next) => {
    const seller = await Seller.findById(req.seller.id);
    res.status(200).json({ success: true, seller });
});

// Change Password Seller
export const changePasswordSeller = catchAsyncError(async (req, res, next) => {
    const seller = await Seller.findById(req.seller.id).select('+password');
    if (!await seller.isValidPassword(req.body.oldPassword)) {
        return next(new ErrorHandler('Old Password is incorrect', 401));
    }
    seller.password = req.body.password;
    await seller.save();
    res.status(200).json({ success: true });
});

// Update Profile Seller
export const updateProfileSeller = catchAsyncError(async (req, res, next) => {
    let newSellerData = {
        name: req.body.name,
        email: req.body.email,
        businessName: req.body.businessName,
        businessAddress: req.body.businessAddress,
        storeLocation: req.body.storeLocation,
        customerReviews: req.body.customerReviews,
        commissionFees: req.body.commissionFees,
        productTypesSelling: req.body.productTypesSelling
    };

    if (req.file) {
        const avatar = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`;
        newSellerData = { ...newSellerData, avatar };
    }

    const seller = await Seller.findByIdAndUpdate(req.seller.id, newSellerData, { new: true, runValidators: true });
    res.status(200).json({ success: true, seller });
});

// Delete My Account Seller
export const deleteMyAccountSeller = catchAsyncError(async (req, res, next) => {
    const seller = await Seller.findById(req.seller.id);
    if (!seller) return next(new ErrorHandler('Seller not found', 404));
    await seller.deleteOne();
    res.status(200).json({ success: true, message: 'Your account has been deleted successfully' });
});

// Admin: Get All Sellers
export const getAllSellers = catchAsyncError(async (req, res, next) => {
    const { name } = req.query;
    let query = {};
    if (name) query.name = { $regex: name, $options: 'i' };

    const sellers = await Seller.find(query)
        .select('name email businessName businessAddress storeLocation')
        .sort({ name: 1 });

    res.status(200).json({ success: true, sellers });
});

// Admin: Get Specific Seller
export const getSeller = catchAsyncError(async (req, res, next) => {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return next(new ErrorHandler(`User Not Found with this id ${req.params.id}`, 401));
    res.status(200).json({ success: true, seller });
});

// Admin: Update Seller
export const updateSeller = catchAsyncError(async (req, res, next) => {
    let newSellerData = { name: req.body.name, email: req.body.email, role: req.body.role };
    if (req.file) {
        const avatar = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`;
        newSellerData = { ...newSellerData, avatar };
    }

    const seller = await Seller.findByIdAndUpdate(req.params.id, newSellerData, { new: true, runValidators: true });
    res.status(200).json({ success: true, seller });
});

// Admin: Delete Seller
export const deleteSeller = catchAsyncError(async (req, res, next) => {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return next(new ErrorHandler(`User Not Found with this id ${req.params.id}`, 401));
    await seller.deleteOne();
    res.status(200).json({ success: true });
});

// Seller Analytics
export const getSellerAnalytics = catchAsyncError(async (req, res, next) => {
    const buyers = await User.find({})
        .select('name email shippingAddress billingAddress productsInterested notificationPreferences')
        .sort({ name: 1 });

    const analyticsData = {
        buyerDemographics: buyers.map(b => ({
            name: b.name || 'Unknown Buyer',
            email: b.email || 'No email',
            shippingAddress: b.shippingAddress || 'No address provided',
            productInterested: b.productsInterested || 'None'
        })),
        notificationPreferences: buyers.map(b => ({
            buyerName: b.name || 'Unknown Buyer',
            email: b.email || 'No email',
            preferences: {
                email: b.notificationPreferences?.includes('email') || false,
                sms: b.notificationPreferences?.includes('sms') || false,
                app: b.notificationPreferences?.includes('app') || false
            }
        })),
        buyerInterests: buyers.filter(b => b.productsInterested).map(b => ({
            buyerName: b.name || 'Unknown Buyer',
            productName: b.productsInterested
        })),
        categoryDistribution: buyers.reduce((acc, b) => {
            if (b.productsInterested) {
                const category = b.productsInterested;
                const existing = acc.find(i => i.name === category);
                if (existing) existing.value++;
                else acc.push({ name: category, value: 1 });
            }
            return acc;
        }, []),
        productInterestCount: buyers.reduce((acc, b) => {
            if (b.productsInterested) {
                const product = b.productsInterested;
                const existing = acc.find(i => i.name === product);
                if (existing) existing.count++;
                else acc.push({ name: product, count: 1 });
            }
            return acc;
        }, [])
    };

    res.status(200).json({ success: true, analyticsData });
});
