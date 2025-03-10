import mongoose from "mongoose";
import { MONGOURI } from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGOURI)
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Error connecting to database:", error));
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};
