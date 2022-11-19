const request = require("supertest");
const app = require("../index");
const usersTestDB = require("./dbMocks/testUser-db");

afterAll(() => {
  usersTestDB.run("DROP TABLE IF EXISTS user");
});

describe("GET /api/users ", () => {
  test("it should return status 400 when there are no users", async (done) => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(400);
    done();
  });

  test("it should return array of 2 obj after adding 2 users", async (done) => {
    await request(app).post("/api/users ").send({
      username: "user1",
    });
    await request(app).post("/api/users").send({
      username: "user2",
    });
    const res = await request(app).get("/api/users");

    expect(res.body.length).toBe(2);
    done();
  });
});

describe("POST /api/users ",() => {
  test("it should respond with status 200 after adding new user", async (done) => {
    const res = await request(app).post("/api/users").send({
      username: "user3",
    });
    expect(res.status).toBe(200);
    done();
  });

  test("it should respond with object that contains id", async (done) => {
    const res = await request(app).post("/api/users").send({
      username: "user4",
    });
    expect(res.body).toHaveProperty("id");
    done();
  });

  test("it should respond with object that contains username", async (done) => {
    const res = await request(app).post("/api/users").send({
      username: "user5",
    });
    expect(res.body.username).toEqual("user5");
    done();
  });

  test("it should respond with status 403 when username is not unique", async (done) => {
    const res = await request(app).post("/api/users").send({
      username: "user5",
    });
    expect(res.status).toBe(403);
    done();
  });

  test("it should respond with error message 'user with this name already exists' when username is not unique", async (done) => {
    const res = await request(app).post("/api/users").send({
      username: "user5",
    });
    expect(res.body.error).toBe("user with this name already exists");
    done();
  });

  test("it should return array of 5 users' objects", async (done) => {
    const res = await request(app).get("/api/users");
    expect(res.body.length).toBe(5);
    done();
  });
})
