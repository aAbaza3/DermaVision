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
  isConfirmation: { 
    type: Boolean, 
    default: false
   }, // For the "Are you sure?" screens
  isMultiChoice: { 
    type: Boolean, 
    default: false 
  }, // For questions with multiple answers
   answer : [{
    text: { type: String, required: true },
    image: { type: String, required: true }, // URL or path to image
   }]

});

const Question = mongoose.model("Question", questionSchema);
export default Question


  

