import mongoose from "mongoose";

const TASK_STATUSES = ["pending", "in-progress", "completed"];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title field is required"],
      minLength: 4,
      maxLength: 50,
    },
    description: {
      type: String,
      minLength: 4,
      maxLength: 500,
    },
    status: {
      type: String,
      enum: TASK_STATUSES,
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
