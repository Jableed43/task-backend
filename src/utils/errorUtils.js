export const handleErrorResponse = (res, error, statusCode = 500) => {
    console.error(error);
    return res.status(statusCode).json({ message: error.message || "Internal server error", error });
  };