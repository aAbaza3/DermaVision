import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Try to get token from header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. Or try from cookies
  if (!token && req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.status(401);
    throw new Error('You are not logged in. Please login to access this route.');
  }
  //console.log('✅ Token received:', token);

  // 3. Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // 4. Get user from decoded token
  const user = await User.findById(decoded.userId).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found or token no longer valid.');
  }

  req.user = user;
  next();
});
