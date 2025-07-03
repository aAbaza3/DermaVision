import { diagnosisDetails } from '../utils/diagnosisData.js';
import Scan from '../models/scanModel.js';
import asyncHandler from 'express-async-handler';


export const uploadScan = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  let { location, diagnosis, confidence, image_url } = req.body;

  // clean data
  location = location?.trim();
  diagnosis = diagnosis?.trim();
  confidence = parseFloat(confidence);

  const diagnosisInfo = diagnosisDetails[diagnosis];

  if (!diagnosisInfo) {
    throw new ApiError('Invalid diagnosis type provided', 400);
  }

  const { riskLevel, advice, description } = diagnosisInfo;

  if (!location || !image_url || !diagnosis || !riskLevel) {
    throw new ApiError('Missing or invalid scan data', 400);
  }

  const newScan = await Scan.create({
    user: userId,
    image: image_url,
    location,
    diagnosis,
    riskLevel,    // ← بيتسجل كـ "Medium Risk : (Contagious)"
    confidence
  });

  res.status(201).json({
    status: 'success',
    data: newScan,
    advice,
    description
  });
});


export const getAllScans = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const scans = await Scan.find({ user: userId }).sort({ uploadedAt: -1 });

  const enrichedScans = scans.map(scan => {
    const extra = diagnosisDetails[scan.diagnosis] || {};

    return {
      ...scan.toObject(),
      advice: extra.advice || '',
      description: extra.description || ''
    };
  });

  res.status(200).json({
    status: 'success',
    results: enrichedScans.length,
    data: enrichedScans
  });
});

export const getScansByLocation = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const location = req.params.location.trim(); 

  const scans = await Scan.find({ user: userId, location });

  const enrichedScans = scans.map(scan => {
    const extra = diagnosisDetails[scan.diagnosis] || {};
    return {
      ...scan.toObject(),
      advice: extra.advice || '',
      description: extra.description || ''
    };
  });

  res.status(200).json({
    status: 'success',
    results: enrichedScans.length,
    data: enrichedScans
  });
});

export const getLastScan = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const lastScan = await Scan.findOne({ user: userId }).sort({ uploadedAt: -1 });
  if (!lastScan) {
    return res.status(404).json({
      status: 'fail',
      message: 'No scans found'
    });
  }

  const extra = diagnosisDetails[lastScan.diagnosis] || {};

  res.status(200).json({
    status: 'success',
    data: {
      ...lastScan.toObject(),
      advice: extra.advice || '',
      description: extra.description || ''
    }
  });
});