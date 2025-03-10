import express from "express";
import { connectDB } from "./db.js";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
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


await connectDB();

const startServer = async () => {
  const server = app.listen(0, () => {
  });
  console.log(`Server is running on port ${server.address().port}`);

  process.on("SIGINT", () => {
    server.close(() => {
      process.exit(0);
    });
  });

  return server;
};

startServer();

export { app, startServer };
