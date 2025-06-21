import express from "express";
import { 
  createQuestion,
  getAllQuestions,
} from "../controllers/questionController.js";

import {submitAnswers} from "../controllers/answerController.js";
import {resizeQuestionImage} from "../utils/cloudinary.js"
import {uploadMultipleImages} from "../utils/multer.js"

const questionRouter = express.Router();


// ---------------------------------- Question Routes
questionRouter.get('/', getAllQuestions);
questionRouter.post('/', createQuestion); // optional for admin use


// questionRouter.get("/",getQuestions);
//questionRouter.get("/:id",getQuestion);
// questionRouter.get("/first", getFirstQuestion);
// questionRouter.post("/next/:questionId", getNextQuestion);
// questionRouter.get("/currentQuestion/:id",currentQuestion)

// questionRouter.post( "/addQuestion",  uploadMultipleImages('images', 5),  resizeQuestionImage,addQuestion);
export default questionRouter;