import asyncHandler from 'express-async-handler';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import cloudinary from './cloudinaryConfig.js';

const uploadToCloudinary = (buffer, filename, folder, format = 'jpeg', quality = 'auto') => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                public_id: filename,
                resource_type: 'image',
                format,
                quality,
            },
            (error, result) => {
                if (error) {
                    reject(new Error(`Cloudinary Upload Error: ${error.message}`, 500));
                } else {
                    resolve(result);
                }
            }
        );
        stream.end(buffer);
    });
};

export const resizeQuestionImage = asyncHandler(async (req, res, next) => {
    try {
        const allowedFormats = ['image/jpeg', 'image/png', 'image/webp']
            req.body.images = (await Promise.allSettled( 
                req.files.map(async (img, index) => {
                    try {
                        if (!allowedFormats.includes(img.mimetype)) return null;

                        const imageName = `question-${uuidv4()}-${index + 1}`;

                        const buffer = await sharp(img.buffer)
                            .resize(1200, 1600, { fit: sharp.fit.cover, position: sharp.strategy.center })
                            .toFormat('webp')
                            .webp({ quality: 90 })
                            .toBuffer();

                        const result = await uploadToCloudinary(buffer, imageName, 'questions');
                        return result.secure_url;
                    } catch (error) {
                        console.error(`Error uploading image ${index + 1}:`, error);
                        return null;
                    }
                })
            )).filter(res => res.status === 'fulfilled' && res.value).map(res => res.value);
        next();
    } catch (error) {
        next(new Error(`Image processing error: ${error.message}`, 500));
    }
});

export const resizeUserImage = asyncHandler(async (req, res, next) => {
    if (!req.file) return next(); // Skip if no image uploaded

    try {
        const profileImageFileName = `user-${uuidv4()}-profile.jpeg`;

        // Resize image
        const buffer = await sharp(req.file.buffer)
            .resize(500, 500, {
                fit: sharp.fit.cover,
                position: sharp.strategy.center
            })
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toBuffer();

        // Upload to Cloudinary
        const result = await uploadToCloudinary(buffer, profileImageFileName, 'users');

        req.body.profile_picture = result.secure_url; // Save URL to request body

        next();
    } catch (error) {
        next(new ApiError('Error processing image upload', 500));
    }
});
