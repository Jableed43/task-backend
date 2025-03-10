import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { verifyToken } from "../middlewares/verifyTokenMiddleware.js";
import { validateTask } from "../middlewares/requestValidators.js";

const taskRouter = Router();

taskRouter.get("/", verifyToken, getTasks);
taskRouter.post("/create", verifyToken, validateTask, createTask);
taskRouter.put("/update/:id", verifyToken, updateTask);
taskRouter.delete("/delete/:id", verifyToken, deleteTask);

export default taskRouter;
