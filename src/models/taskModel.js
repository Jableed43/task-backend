import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title field is required"],
        minLength: 3,
        maxLength: 50,
      },
      description: {
        type: String,
        minLength: 10,
        maxLength: 500,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },      
},
{ timestamps: true },
);

export default mongoose.model("Task", taskSchema);
