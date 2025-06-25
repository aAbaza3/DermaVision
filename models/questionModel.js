import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: {
     type: String, 
     required: true
     },
  order: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  isMultiChoice: { 
    type: Boolean, 
    default: false 
  }, // For questions with multiple answers
   answer : [{
    text: { type: String, required: true },
 
   }],
   active: {
  type: Boolean,
  default: true
}


});

const Question = mongoose.model("Question", questionSchema);
export default Question


  

