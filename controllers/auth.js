import 'dotenv/config';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
// import jwt from 'jsonwebtoken';
// import slugify from 'slugify';
import generateToken from '../utils/genrateToken.js';
import { sendPasswordResetEmail, sendVerificationEmail } from '../utils/emailss/emails.js';
import User from '../models/user.js';
import ApiError from '../utils/apiError.js';


export const signUp = asyncHandler(async (req, res, next) => {

  const verificationCode = crypto.randomInt(100000, 999999).toString();
  const verificationCodeExpiresAt = Date.now() + 60 * 60 * 1000;

  const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, 
      isVerified: false,
      verificationCode,
      verificationCodeExpiresAt
  });

  if (!user) {
      return next(new ApiError('User creation failed', 500));
  }

  try {
      await sendVerificationEmail(user.email, user.name, verificationCode);
  } catch (error) {
      user.passwordResetCode = undefined;
      user.passwordResetExpiresAt = undefined;
      user.passwordResetVerified = undefined;
      await user.save();
      return next(new ApiError('Failed to send verification code email. Please try again.', 500));
  }

  res.status(201).json({
      status: 'success',
      message: 'Verification code sent to your email. Please verify your account'
  });
});

  // @desc    Verify Email
// @route   POST /api/auth/verify-email
// @access  Public
export const verifyEmail = asyncHandler(async (req, res, next) => {
  const { email, verificationCode } = req.body;

  const user = await User.findOne({
    email,
    verificationCode,
    verificationCodeExpiresAt: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ApiError('Invalid or expired verification code', 400));
  }

  user.isVerified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpiresAt = undefined;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully. You can now log in.',
  });
});

// @desc    Login
// @route   POST/api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {

  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError('Incorrect email or password', 401));
  }

  const token = generateToken(user._id, res);
  delete user.password;

  res.status(200).json({ data: user, token });
});

// @desc   Forget password
// @route  POST/api/v1/auth/forgotPassword
// @access private
export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).json({
      success: true,
      message: "If your email is registered, you'll receive a password reset link shortly.",
    });
  }
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const resetCodeExpiresAt = Date.now() + 10 * 60 * 1000; // 10 min
  const hashedResetCode = crypto.createHash('sha256').update(resetCode).digest('hex');

  user.resetPasswordToken = hashedResetCode;
  user.resetPasswordTokenExpiration = resetCodeExpiresAt;
  user.passwordResetVerified = false;
  await user.save();

  try {
    await sendPasswordResetEmail(user.email, user.name, resetCode);
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiration = undefined;
    user.passwordResetVerified = undefined;
    await user.save();
    return next(new ApiError('Failed to send password reset email. Please try again.', 500));
  }
  res.status(200).json({
    success: true,
    message: 'Password reset code sent to your email',
  });
});

// @desc    Verify Password Reset Code
// @route   POST/api/auth/verify-resetCode
// @access  Private
export const verifyResetToken = asyncHandler(async (req, res, next) => {
  const { resetCode } = req.body;
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');

  const user = await User.findOne({ resetPasswordToken: hashedResetCode });
  if (!user || user.resetPasswordTokenExpiration < Date.now()) {
    return next(new ApiError('Reset code invalid or expired', 400));
  }
  user.passwordResetVerified = true;
  await user.save();
  res.status(200).json({
    status: 'Success'
  });
});


// @desc    Reset Password
// @route   POST/api/auth/reset-password
// @access  Private
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError("Invalid User email", 404));
  }

  if (!user.passwordResetVerified) {
    return next(new ApiError('Reset code not verified', 400));
  }
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiration = undefined;
  user.passwordResetVerified = undefined

  await user.save();
  //const token = createToken(user._id, res);
  //res.status(200).json({ token });
  res.status(200).json({
    stasus: 'Success',
    message: 'Password has been reset successfully. Please log in with your new password.'
  });
});

// @desc    Logout
// @route   POST/api/v1/auth/logout
// @access  private
export const logout = asyncHandler(async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new ApiError('User not authenticated', 401));
    }

    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged Out Successfully' });
  } catch (err) {
    console.log(err);
    next(new ApiError('Server Error', 500));
  }
});

// @desc    Check Authentication
// @route   GET/api/v1/auth/checkAuth
// @access  private
export const checkAuth = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json({ data: req.user });
  } catch (err) {
    console.log('Error in checkAuth controller', err);
    next(new ApiError('Server Error', 500));
  }
});

