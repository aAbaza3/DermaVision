import express from 'express';
import { uploadSingleImage } from '../utils/multer.js';
import { resizeScanImage } from '../utils/cloudinary.js';
import { protect } from '../middleware/protect.js';
import { uploadScan } from '../controllers/scanController.js';

const router = express.Router();

router.post(
  '/upload',
  protect,
  uploadSingleImage('image'),  // المستخدم بيرفع صورة واحدة
  resizeScanImage,             // Resize & رفع لـ Cloudinary
  uploadScan                   // الكنترولر اللي بيرجع النتيجة
);

export default router;
