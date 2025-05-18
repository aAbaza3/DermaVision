import Scan from '../models/scanModel.js';
import asyncHandler from 'express-async-handler';

export const uploadScan = asyncHandler(async (req, res) => {
  console.log('req.body:', req.body); 
  const { location, image_url } = req.body;
  const userId = req.user._id;

  if (!image_url) {
    res.status(400);
    throw new Error('Image upload failed');
  }

  if (!location) {
    res.status(400);
    throw new Error('Location is required');
  }

  const newScan = await Scan.create({
    user: userId,
    image: image_url,
    location
  });

  res.status(201).json({
    status: 'success',
    data: newScan
  });
});
