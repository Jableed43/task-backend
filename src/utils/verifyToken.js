import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET); 
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Expired Token");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid Token");
    } else {
      throw new Error("Unknown error at verifying token");
    }
  }
}
