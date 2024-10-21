import request from "supertest";
import { App } from "../app";
import { headersMiddleware } from "../middlewares/headers.middleware";
import { validate } from "uuid";
import { User } from "../users/user.model";

describe("scenario 1", () => {
  const app = new App();
  app.use(headersMiddleware);
  const server = app.start();

  let newCreatedUser: User;
  it("Get all records with a GET api/users", async () => {
    const { body, status } = await request(server).get("/users");
    expect(status).toBe(200);
    expect(body).toEqual([]);
  });

  it("A new object is created by a POST api/users", async () => {
    const payload = {
      username: "new user name",
      age: 12,
      hobbies: ["sleep"],
    };

    const { body, status }: { body: User; status: number } = await request(
      server
    )
      .post("/users")
      .send(payload);

    expect(status).toBe(201);
    expect(body).toHaveProperty("id");
    expect(body.id).toBeDefined();
    expect(validate(body.id)).toBeTruthy();
    expect(body.username).toBe(payload.username);
    expect(body.age).toBe(payload.age);
    expect(body.hobbies).toEqual(payload.hobbies);

    const { body: allUsers } = await request(server).get("/users");

    expect(allUsers).toHaveLength(1);

    newCreatedUser = body;
  });

  it("should get the created user by ID", async () => {
    const { status, body } = await request(server).get(
      `/users/${newCreatedUser.id}`
    );

    expect(status).toBe(200);
    expect(body).toHaveProperty("id", newCreatedUser.id);
    expect(body.username).toBe("new user name");
    expect(body.age).toBe(12);
    expect(body.hobbies).toEqual(["sleep"]);
  });

  it("We try to update the created record with a PUT", async () => {
    const payload = {
      username: "new user name 2",
      age: 1000,
      hobbies: ["writing tests"],
    };
    const { status, body } = await request(server)
      .put(`/users/${newCreatedUser.id}`)
      .send(payload);

    expect(status).toBe(200);
    expect(body.id).toBe(newCreatedUser.id);
  });

  it("Delete user by id with /users/{id}", async () => {
    const { status } = await request(server).delete(
      `/users/${newCreatedUser.id}`
    );

    expect(status).toBe(204);
  });

  it("trying to get a deleted object by id", async () => {
    const { status, body } = await request(server).get(
      `/users/${newCreatedUser.id}`
    );

    expect(body).toBe(`user with id:${newCreatedUser.id} doesn't exist`);
    expect(status).toBe(404);
  });
});
