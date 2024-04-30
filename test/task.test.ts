import * as request from "supertest";
import app from "../src/app";
import { seed, unseed } from "./seeds/task.seed";
import { TaskEntity } from "../src/task/entities/task.entity";
import { CreateTaskDto, createTaskDto } from "../src/task/dto";
import { CreateCategoryDto } from "../src/category/dto";
import { Color } from "../src/category/entities/category.entity";
import { Priority, Status } from "@prisma/client";

let id: string;
let accessToken: string;
let tasks: TaskEntity[];
let createdTaskId: string;
let categoryId: string;

beforeAll(async () => {
  tasks = await seed(120);
  console.log(tasks);
});

afterAll(async () => {
  await request.default(app).post(`/users/id/${id}`);
  await unseed(tasks);
});

const createUserPayload = {
  name: "Matheus Teste",
  email: "sduwowsqkdnxamcoza@mail.com",
  password: "matheus123",
  weight: 80,
};
describe("Should test task endpoints", () => {
  beforeAll(async () => {
    const response = await request
      .default(app)
      .post("/signup")
      .send(createUserPayload);

    console.log(response.body);

    id = response.body.user.id;
    accessToken = response.body.access_token;
  });

  it("should create task with valid credentials", async () => {
    const response = await request
      .default(app)
      .post("/tasks")
      .send({
        title: "test",
        description: "test",
        priority: Priority.LOW,
        category_id: categoryId,
        status: Status.PENDING,
        user_id: id,
        conclusion: new Date(),
      } as CreateTaskDto)
      .set("Authorization", `Bearer ${accessToken}`);

    console.log(response.body);

    expect(response.status).toBe(201);
    createdTaskId = response.body.id;
  });

  it("should create category to test tasks with", async () => {
    const response = await request
      .default(app)
      .post("/category")
      .send({
        color: Color.GREEN,
        name: "Teste",
      } as CreateCategoryDto);

    categoryId = response.body.id;
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
    futureDate.setDate(futureDate.getDate() + 1);
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
