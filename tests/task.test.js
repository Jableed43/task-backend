import request from "supertest";
import { app } from "../src/index.js";
import User from "../src/models/userModel.js";
import Task from "../src/models/taskModel.js";
import { generateToken } from "../src/middlewares/verifyTokenMiddleware.js";

let token;
let user;
let taskId;

beforeAll(async () => {

  await User.deleteOne({ email: "test@example.com" });
  await Task.deleteMany({ user: user?._id });

      const userData = new User({
        username: "testuser3",
        email: "test@example.com",
        password: "Password123",
      });

      user = await userData.save();
  token = generateToken(user._id);
  
  const task = await Task.create({
    title: "Test Task",
    description: "Some description",
    userId: user._id,
  });
  taskId = task._id;
});

afterAll(async () => {
  await Task.deleteOne({ _id: taskId }); 
  await User.deleteOne({ _id: user._id }); 
});

describe("Task API", () => {
  test("Should create a new task", async () => {
    const res = await request(app)
      .post("/api/task/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "New Task", userId: user._id });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    taskId = res.body._id;
  });

  test("Should get all tasks", async () => {
    const res = await request(app)
      .get("/api/task")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.tasks)).toBe(true);
    expect(res.body.tasks.length).toBeGreaterThan(0);
  });

  test("Should update task", async () => {
    const res = await request(app)
      .put(`/api/task/update/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Task", userId: user._id });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated Task");
  });

  test("Should delete task", async () => {
    const res = await request(app)
      .delete(`/api/task/delete/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task deleted successfully");
  });
});
