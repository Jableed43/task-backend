import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { handleErrorResponse } from "../utils/errorUtils.js";
import { JWT_SECRET } from "../config.js";

const findUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  return user;
};

export const createUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    const userExist = await User.findOne({ username });
    const emailExist = await User.findOne({ email });

    if (userExist || emailExist) {
      return res.status(400).json({
        message: `User with ${userExist ? `username: ${username}` : `email: ${email}`} already exists`,
      });
    }

    const userData = new User({ ...req.body });

    const savedUser = await userData.save();

    const { password: _, ...userWithoutPassword } = savedUser.toObject(); 

    return res.status(201).json(userWithoutPassword);  
  } catch (error) {
    console.error("Error creating user:", error);
    return handleErrorResponse(res, error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();

    return res.status(users.length ? 200 : 204).json(
      users.length
        ? {
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
            users,
          }
        : { message: "There are no users" }
    );
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await findUserById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(_id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const _id = req.params.id;

    const user = await findUserById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(_id, req.body, { new: true });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const validate = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ message: "Both email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid user or password" });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { userId: user._id, userEmail: user.email },
        JWT_SECRET,
        { expiresIn: "2h" }
      );
      return res.status(200).json({
        message: "Logged in successfully",
        token,
        user: { id: user._id, email: user.email, userName: user.username },
      });
    } else {
      return res.status(400).json({ message: "Invalid user or password" });
    }
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};
