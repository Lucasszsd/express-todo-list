import { describe, expect, it } from "@jest/globals";
import * as request from "supertest";
import app from "../src/app";

describe("Should test user endpoints", () => {
  let id = "";
  let accessToken = "";

  it("should create user with valid credentals", async () => {
    const response = await request.default(app).post("/signup").send({
      name: "matheus",
      email: "matheus@mail.com",
      password: "matheus123",
      weight: 80,
    });

    id = response.body.user.id;
    accessToken = response.body.access_token;
    expect(response.status).toBe(201);
    expect(response.body.access_token).toBeDefined();
    expect(response.body.user.id).toBeDefined();
    expect(response.body.user.email).toBeDefined();
    expect(response.body.user.name).toBeDefined();
    expect(response.body.user.weight).toBeDefined();
    expect(response.body.user.createdAt).toBeDefined();
    expect(response.body.user.updatedAt).toBeDefined();
  });

  it("should throw bad request when user with same email already exists", async () => {
    const response = await request.default(app).post("/signup").send({
      name: "matheus",
      email: "matheus@mail.com",
      password: "matheus1",
      weight: 100,
    });

    expect(response.status).toBe(409);
  });

  it("should login with right credentials", async () => {
    const response = await request
      .default(app)
      .post("/signin")
      .send({ email: "matheus@mail.com", password: "matheus123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token");
  });

  it("shouldnt login with wrong credentials", async () => {
    const response = await request
      .default(app)
      .post("/signin")
      .send({ email: "mat@mail.com", password: "matheus123" });

    expect(response.status).toBe(401);
  });

  it("should delete created user", async () => {
    console.log(id);

    const response = await request
      .default(app)
      .delete(`/user/${id}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(204);
  });

  it("should find all users", async () => {});

  it("should find user by id", async () => {});

  it("should throw bad request when creating user with wrong parameters", async () => {});

  it("should throw not found when deleting user with wrong body", async () => {});

  it("should update user with valid credentals", async () => {});

  it("should throw not found when updating user with wrong parameters", async () => {});
});
