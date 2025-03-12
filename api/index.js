import express from "express";
import { connectDB } from "../src/db.js";
import userRouter from "../src/routes/userRoute.js";
import taskRouter from "../src/routes/taskRoute.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.get("/api/test", (req, res) => {
  res.status(200).send("working ok");
});

await connectDB();

export default app;
