import { Router } from "express";
import {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  validate,
} from "../controllers/userController.js";
import { validateUser } from "../middlewares/requestValidators.js";

const userRouter = Router();

userRouter.post("/create", validateUser, createUser);
userRouter.get("/", getUsers);
userRouter.delete("/delete/:id", deleteUser);
userRouter.put("/update/:id", updateUser);
userRouter.post("/validate", validate);

export default userRouter;
