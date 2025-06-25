import express from 'express';
import { submitAnswers } from '../controllers/answerController.js';

const router = express.Router();

// هنا بتسجلي الإجابات
router.post('/submit', submitAnswers);

export default router;

