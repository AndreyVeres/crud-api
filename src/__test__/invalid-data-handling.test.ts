import { bodyParserMiddleware } from '../middlewares/bodyParser.middleware';
import request from "supertest";
import { App } from "../app";
import { headersMiddleware } from "../middlewares/headers.middleware";

describe("User API - Invalid Data Handling", () => {
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

  it("should not create a user with invalid data", async () => {
    const payload = {
      age: 12,
      hobbies: ["sleep"],
    };

    const { status, body } = await request(server).post("/users").send(payload);

    expect(status).toBe(400); 
    expect(body).toBe("Property 'username' is required");
  });

  it("should create a new user with valid data", async () => {
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

  it("should get the created user by ID", async () => {
    const { status, body } = await request(server).get(
      `/users/${createdUserId}`
    );

    expect(status).toBe(200);
    expect(body).toHaveProperty("id", createdUserId);
    expect(body.username).toBe("new user name");
  });
});
