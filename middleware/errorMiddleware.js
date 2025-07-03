// middleware/errorMiddleware.js

const globalErrorHandler = (err, req, res, next) => {
  // 1. خدي الحالة من ApiError أو خليها 500
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  // 2. ابعتي الرد بشكل موحّد
  res.status(statusCode).json({
    status: status,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

export default globalErrorHandler;
