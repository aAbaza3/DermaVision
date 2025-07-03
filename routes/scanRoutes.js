import express from 'express';
import { uploadSingleImage } from '../utils/multer.js';
import { resizeScanImage } from '../utils/cloudinary.js';
import { protect } from '../middleware/protect.js';
import { 
  uploadScan,
  getAllScans,
  getScansByLocation,
  getLastScan

 } from '../controllers/scanController.js';

const router = express.Router();

router.post(
  '/upload',
  protect,
  uploadSingleImage('image'),  // المستخدم بيرفع صورة واحدة
  resizeScanImage,             // Resize & رفع لـ Cloudinary
  uploadScan                   // الكنترولر اللي بيرجع النتيجة
);

router.get('/all', protect, getAllScans);
router.get('/last', protect, getLastScan);
router.get('/location/:location', protect, getScansByLocation);

export default router;
