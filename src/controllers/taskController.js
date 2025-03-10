import Task from "../models/taskModel.js";
import { handleErrorResponse } from "../utils/errorUtils.js";
import { findTaskById } from "../utils/taskUtils.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const createTask = async (req, res) => {
  try {
    const taskData = new Task({title: req.body.title, description: req.body.description, userId: req.userId});
    const savedTask = await taskData.save();
    return res.status(201).json(savedTask);
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const updateTask = async (req, res) => {
  try {
    await findTaskById(req.params.id);
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(updatedTask);
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    await findTaskById(req.params.id);
    await Task.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};
