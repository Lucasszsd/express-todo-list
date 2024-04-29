//faltou adicionar o teste do payload de update
import * as request from "supertest";
import app from "../src/app";
import { seed, unseed } from "./seeds/task.seed";
import { UserEntity } from "../src/user/entities/user.entity";
import { TaskEntity } from "../src/task/entities/task.entity";

let id = "";
let accessToken = "";
let tasks: TaskEntity[];

beforeAll(async () => {
  tasks = await seed(120);
  console.log(tasks);
});

afterAll(async () => {
  await unseed(tasks);
});

const createUserPayload = {
  name: "Matheus Teste",
  email: "sduwowsqkdnxamcoza@mail.com",
  password: "matheus123",
  weight: 80,
};
describe("Should test task endpoints", () => {
  // Login or create user before running the tests
  beforeAll(async () => {
    const response = await request
      .default(app)
      .post("/signup")
      .send(createUserPayload);

    console.log(response.body);

    id = response.body.user.id;
    accessToken = response.body.access_token;
  });

  let createdTaskId: string; // Variable to store the ID of the created task

  it("should create task with valid credentials", async () => {
    const response = await request
      .default(app)
      .post("/tasks")
      .send({
        title: "test",
        description: "test",
        priority: "LOW",
        status: "PENDING",
        user_id: id,
        conclusion: new Date().toISOString(),
      })
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(201);
    createdTaskId = response.body.id; // Store the ID of the created task
  });

  it("should throw bad request when creating task with missing required fields", async () => {
    const response = await request
      .default(app)
      .post("/tasks")
      .send({
        description: "test",
        priority: "LOW",
        status: "PENDING",
        user_id: id,
        conclusion: new Date().toISOString(),
      })
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(400);
  });

  it("should throw bad request when creating task with invalid priority", async () => {
    const response = await request
      .default(app)
      .post("/tasks")
      .send({
        title: "test",
        description: "test",
        priority: "INVALID_PRIORITY",
        status: "PENDING",
        user_id: id,
        conclusion: new Date().toISOString(),
      })
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(400);
  });

  it("should throw bad request when creating task with invalid status", async () => {
    const response = await request
      .default(app)
      .post("/tasks")
      .send({
        title: "test",
        description: "test",
        priority: "LOW",
        status: "INVALID_STATUS",
        user_id: id,
        conclusion: new Date().toISOString(),
      })
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(400);
  });

  it("should throw bad request when creating task with future conclusion date", async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // Adding one day to the current date
    const response = await request
      .default(app)
      .post("/tasks")
      .send({
        title: "test",
        description: "test",
        priority: "LOW",
        status: "PENDING",
        user_id: id,
        conclusion: futureDate.toISOString(),
      })
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(400);
  });

  it("should throw bad request when creating task with invalid user ID", async () => {
    const response = await request
      .default(app)
      .post("/tasks")
      .send({
        title: "test",
        description: "test",
        priority: "LOW",
        status: "PENDING",
        user_id: "INVALID_USER_ID",
        conclusion: new Date().toISOString(),
      })
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(400);
  });

  it("should get all tasks", async () => {
    const response = await request
      .default(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should get a task by ID", async () => {
    const response = await request
      .default(app)
      .get(`/tasks/${id}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(id);
  });

  it("should update a task with valid credentials", async () => {
    const response = await request
      .default(app)
      .patch(`/tasks/${id}`)
      .send({ title: "Updated Title" })
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(id);
    expect(response.body.title).toBe("Updated Title");
  });

  it("should throw not found when updating task with unexistent id", async () => {
    const response = await request
      .default(app)
      .patch(`/tasks/0`)
      .send({ title: "Updated Title" })
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(404);
  });

  it("should delete a task by ID", async () => {
    const response = await request
      .default(app)
      .delete(`/tasks/${id}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(204);
  });

  it("should throw not found when deleting task with unexistent id", async () => {
    const response = await request
      .default(app)
      .delete(`/tasks/0`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(404);
  });
});
