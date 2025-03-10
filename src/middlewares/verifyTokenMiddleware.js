import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Expired Token" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid Token" });
    } else {
      return res.status(500).json({ message: "Unknown error at verifying token" });
    }
  }
}

export function generateToken(userId) {
  const payload = { userId };
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, JWT_SECRET, options);
}
