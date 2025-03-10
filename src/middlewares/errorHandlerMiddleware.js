export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message =
    statusCode === 400
      ? "Bad request"
      : statusCode === 500
      ? "Internal server error"
      : err.message || "Unknown error";
  return res.status(statusCode).json({ error: message });
};
