import express from "express";
import { 
  getQuestions,
  //getQuestion,
  getFirstQuestion,
  getNextQuestion,
  addQuestion,
  currentQuestion
} from "../controllers/questionController.js";

import {resizeQuestionImage} from "../utils/cloudinary.js"
import {uploadMultipleImages} from "../utils/multer.js"
const questionRouter = express.Router();
questionRouter.get("/",getQuestions);
//questionRouter.get("/:id",getQuestion);
questionRouter.get("/first", getFirstQuestion);
questionRouter.post("/next/:questionId", getNextQuestion);
questionRouter.get("/currentQuestion/:id",currentQuestion)

questionRouter.post( "/addQuestion",  uploadMultipleImages('images', 5),  resizeQuestionImage,addQuestion);
export default questionRouter;