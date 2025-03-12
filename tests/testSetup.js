import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { startServer } from "../api/index.js";

let mongoServer;
let server;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  server = await startServer(); 
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  if (server) {
    await server.close();
  }
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});
