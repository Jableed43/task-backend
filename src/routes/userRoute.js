import { Router } from "express";
import {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  validate,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/create", createUser);
userRouter.get("/", getUsers);
userRouter.delete("/delete/:id", deleteUser);
userRouter.put("/update/:id", updateUser);
userRouter.post("/validate", validate);

export default userRouter;
