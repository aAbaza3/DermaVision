// import mongoose from "mongoose";


// const answerSchema = new mongoose.Schema({
//   text: { 
//     type: String, 
//     required: true
//    },
//   questionId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "Question", 
//     //required: true 
//   },
//   nextQuestionId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "Question" 
//   },
//   leadsToConfirmation: { 
//     type: Boolean,
//      default: false 
//     },
//   confirmationImage: { type: String }  // Specific image for this answer
// });

// const Answer = mongoose.model("Answer", answerSchema);
// export default Answer