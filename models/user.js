import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name : {
        type : String,  
        trim : true,
        required : [true , 'Name is required'],
        maxlength : [50 , 'Name must be less than 50 characters'],
        minlength : [3 , 'Name must be greater than 3 characters']
    },
    phone :{ 
        type : String,
        //required : [true , 'Phone Number is required']
       },
    email : {
        type : String,
        required : [true , 'Email Address is required'],
        lowercase : true,
        unique : true,
    },
    password : {
        type : String,
        minlength : [5, ' passwords must be greater than 5'],
        required : [true , 'Password is required']
    },
    profile_picture : {
        type : String,
        default : '',
    },

    resetPasswordToken: String,
    resetPasswordTokenExpiration: Date,
    passwordResetVerified : Boolean

 },{ timestamps: true });
     
 userSchema.pre('save', async function (next) {   
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

export default mongoose.model('User', userSchema);

