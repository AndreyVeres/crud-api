import request from "supertest";
import { App } from "../app";
import { headersMiddleware } from "../middlewares/headers.middleware";
import { bodyParserMiddleware } from "../middlewares/bodyParser.middleware";

describe("User API - Update and Delete User", () => {
  const app = new App();
  app.use(headersMiddleware);
  app.use(bodyParserMiddleware)
  const server = app.start();

  let createdUserId: string;

  it("should return an empty list of users initially", async () => {
    const { status, body } = await request(server).get("/users");
    expect(status).toBe(200);
    expect(body).toEqual([]);
  });

  it("should create a new user", async () => {
    const payload = {
      username: "new user name",
      age: 12,
      hobbies: ["sleep"],
    };

    const { body, status } = await request(server).post("/users").send(payload);

    expect(status).toBe(201);
    expect(body).toHaveProperty("id");
    createdUserId = body.id;
  });

  it("should update the created user", async () => {
    const updatedPayload = {
      username: "updated user name",
      age: 15,
      hobbies: ["reading"],
    };

    const { body, status } = await request(server)
      .put(`/users/${createdUserId}`)
      .send(updatedPayload);

    expect(status).toBe(200);
    expect(body).toHaveProperty("id", createdUserId);
    expect(body.username).toBe(updatedPayload.username);
    expect(body.age).toBe(updatedPayload.age);
    expect(body.hobbies).toEqual(updatedPayload.hobbies);
  });

  it("should delete the created user", async () => {
    const { status } = await request(server).delete(`/users/${createdUserId}`);
    expect(status).toBe(204);
  });

  it("should return 404 for deleted user", async () => {
    const { status, body } = await request(server).get(
      `/users/${createdUserId}`
    );
    expect(status).toBe(404);
    expect(body).toBe(`user with id:${createdUserId} doesn't exist`);
  });
});
