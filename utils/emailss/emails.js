import 'dotenv/config';
import asyncHandler from 'express-async-handler';
import transporter from './nodemailerConfig.js';
import { PASSWORD_RESET_REQUEST_TEMPLATE,EMAIL_VERIFICATION_TEMPLATE } from './emailTemplates.js';

// export const sendVerificationEmail = asyncHandler(async (isEmail, verificationToken) => {

// });


export const sendPasswordResetEmail = asyncHandler(async (to, username, resetCode) => {
    const updatedHtml = PASSWORD_RESET_REQUEST_TEMPLATE
        .replace('{username}', username)
        .replace('{resetCode}', resetCode);

    const mailOptions = {
        from: `DermaVision <${process.env.Email_USER}>`,
        to: to,
        subject: 'Password Reset Code (Valid for 10 min)',
        html: updatedHtml,
        category: 'Password Reset'
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent:', info.response);
    } catch (error) {
        console.error('Failed to send password reset email:', error);
    }
});



export const sendVerificationEmail = asyncHandler(async (to, username, verificationCode) => {
    const updatedHtml = EMAIL_VERIFICATION_TEMPLATE
        .replace('{username}', username)
        .replace('{verificationCode}', verificationCode);

    const mailOptions = {
        from: `DermaVision <${process.env.Email_USER}>`,
        to: to,
        subject: 'Email Verification Code (Valid for 1 hour)',
        html: updatedHtml,
        category: 'Email Verification'
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent:', info.response);
    } catch (error) {
        console.error(' Failed to send verification email:', error);
    }
});

