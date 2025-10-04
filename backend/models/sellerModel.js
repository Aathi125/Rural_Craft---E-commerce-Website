import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    email: {
        type: String,
        required: [true, 'Please enter Email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        maxlength: [6, 'Password cannot exceed 6 characters'],
        select: false
    },
    avatar: String,
    twoFACode: String,
    twoFAExpires: Date,
    is2FAVerified: { type: Boolean, default: false },
    role: { type: String, default: 'seller' },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt: { type: Date, default: Date.now },
    businessName: String,
    businessAddress: String,
    storeLocation: String,
    businessRegistrationNo: String,
    acceptedPaymentMethods: String,
    customerReviews: String,
    commissionFees: Number,
    productTypesSelling: String
});

// Hash password before save
sellerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// JWT token
sellerSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPRESS_TIME
    });
};

// Password validation
sellerSchema.methods.isValidPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// Reset password token
sellerSchema.methods.getResetToken = async function () {
    const token = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000; // 30 mins
    return token;
};

// 2FA methods
sellerSchema.methods.generate2FACode = function () {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.twoFACode = code;
    this.twoFAExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    return code;
};

sellerSchema.methods.clear2FACode = function () {
    this.twoFACode = undefined;
    this.twoFAExpires = undefined;
    return this.save({ validateBeforeSave: false });
};

sellerSchema.methods.verify2FACode = function (code) {
    return this.twoFACode === code && Date.now() < this.twoFAExpires;
};

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;
