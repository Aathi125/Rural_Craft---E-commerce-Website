import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
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
    role: { type: String, default: 'user' },
    isActive: { type: Boolean, default: true }, // ✅ Added active status
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    twoFACode: String,
    twoFAExpires: Date,
    is2FAVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    shippingAddress: { type: String, default: "" },
    billingAddress: { type: String, default: "" },
    wishlist: { type: String, default: "" },
    notificationPreferences: { type: String },
    feedbacks: { type: String, default: "" },
    productsInterested: { type: String, default: "" },
});

// 🔒 Hash password before save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// 🔑 JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPRESS_TIME
    });
};

// ✅ Password validation
userSchema.methods.isValidPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// 🔄 Reset password token
userSchema.methods.getResetToken = async function () {
    const token = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000; // 30 mins
    return token;
};

// 2FA methods
userSchema.methods.generate2FACode = function () {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.twoFACode = code;
    this.twoFAExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    return code;
};

userSchema.methods.clear2FACode = function () {
    this.twoFACode = undefined;
    this.twoFAExpires = undefined;
    return this.save({ validateBeforeSave: false });
};

userSchema.methods.verify2FACode = function (code) {
    return this.twoFACode === code && Date.now() < this.twoFAExpires;
};

const User = mongoose.model('User', userSchema);
export default User;
