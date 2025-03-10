import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { isGoodPassword } from "../utils/validators.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 20,
      minlength: 2,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 30,
      minlength: 6,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
      unique: true,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  if (!isGoodPassword(this.password)) {
    return next(
      new Error(
        "Password must be between 6 and 12 characters, with at least one number, one uppercase letter, and one lowercase letter"
      )
    );
  }

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});


export default mongoose.model("User", userSchema);
