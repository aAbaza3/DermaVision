import multer from "multer";

// 1. إعداد التخزين في الذاكرة لاستخدامه مع sharp
const multerStorage = multer.memoryStorage();

// 2. تصفية الملفات: قبول الصور فقط
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        const error = new Error("Not an image! Please upload only images.");
        error.statusCode = 400;
        cb(error, false);
    }
};

// 3. إعداد multer
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // حد أقصى 5MB لكل صورة
});

// 4. رفع صورة واحدة
export const uploadSingleImage = (fieldName) => upload.single(fieldName);

// 5. رفع صور متعددة
export const uploadMultipleImages = (fieldName = "images", maxCount = 5) => upload.array(fieldName, maxCount);



