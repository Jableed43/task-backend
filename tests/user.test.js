import request from "supertest";
import { app } from "../api/index.js";
import User from "../src/models/userModel.js";

describe("User API", () => {
  let userId;
  let newUserId;

  beforeAll(async () => {
    const userData = new User({
      username: "testuser",
      email: "test@example.com",
      password: "Password123",
    });
    const savedUser = await userData.save();

    userId = savedUser._id;

    const newUser = new User({
      username: "newuser",
      email: "new@example.com",
      password: "Password123",
    });
    const savedNewUser = await newUser.save();
    newUserId = savedNewUser._id;
  });

  afterAll(async () => {
    await User.findByIdAndDelete(userId);
    await User.findByIdAndDelete(newUserId);
  });

  test("Should create a new user", async () => {
    const res = await request(app).post("/api/user/create").send({
      username: "newuser224",
      email: "new224@example.com",
      password: "Password123",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    await User.findByIdAndDelete(res.body._id);
  });

  test("Should get all users", async () => {
    const res = await request(app).get("/api/user/");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  test("Should update user", async () => {
    const res = await request(app)
      .put(`/api/user/update/${userId}`)
      .send({ username: "updatedUser" });
    expect(res.status).toBe(200);
    expect(res.body.username).toBe("updatedUser");
  });

  test("Should delete user", async () => {
    const res = await request(app).delete(`/api/user/delete/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User deleted successfully");
  });
});
