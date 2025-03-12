import express from "express";
import { connectDB } from "../src/db.js";
import userRouter from "../src/routes/userRoute.js";
import taskRouter from "../src/routes/taskRoute.js";
import cors from "cors";
import { PORT as SERVERPORT } from "../src/config.js";


const app = express();
const PORT = process.env.NODE_ENV === "test" ? 0 : SERVERPORT;

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

const startServer = async () => {
  const server = app.listen(PORT, () => {
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
