
import express from "express"
import {
  signUp,
  login,
  forgetPassword,
  verifyResetToken,
  resetPassword,
}  from "../controllers/auth.js"

const router = express.Router();

//routes
//REGISTER || POST
router.post("/signup", signUp);

// LOGIN || POST
router.post("/login", login);

router.route('/forgetPassword')
.post(forgetPassword);
// Forget Password
router.route('/verifyResetToken')
.post(verifyResetToken);
// Forget Password
router.route('/resetPassword')
.post(resetPassword);

export default  router;
