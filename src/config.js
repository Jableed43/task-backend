import dotenv from "dotenv";

dotenv.config();

export const URI = process.env.MONGODB_URI;

export const MONGOURI = process.env.MONGODB_URI;

export const JWT_SECRET = process.env.JWT_SECRET

export const PORT = process.env.PORT