import express from "express";
import { 
  createQuestion,
  getAllQuestions,
   toggleQuestionActive
} from "../controllers/questionController.js";


const questionRouter = express.Router();


// ---------------------------------- Question Routes
questionRouter.get('/', getAllQuestions);
questionRouter.post('/', createQuestion); // optional for admin use
questionRouter.patch('/:id/toggle', toggleQuestionActive);



export default questionRouter;