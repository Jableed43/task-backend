import request from "supertest";
import { app } from "../src/index.js";
import User from "../src/models/userModel.js";
import Task from "../src/models/taskModel.js";
import { generateToken } from "../src/middlewares/verifyTokenMiddleware.js";

let token;
let user;
let taskId;

beforeAll(async () => {
  user = await User.create({
    username: "testuser3",
    email: "test@example.com",
    password: "Password123",
  });
  
  token = generateToken(user._id);
  
  const task = await Task.create({
    title: "Test Task",
    user: user._id,
  });
  taskId = task._id;
});

afterAll(async () => {
  await User.deleteMany({});
  await Task.deleteMany({});
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
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
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
