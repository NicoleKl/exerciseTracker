const request = require("supertest");
const app = require("../index");

const usersTestDB = require("./dbMocks/testUser-db");
const exercisesTestDB = require("./dbMocks/testExercises-db");

afterAll(() => {
  usersTestDB.run("DROP TABLE IF EXISTS user");
  exercisesTestDB.run("DROP TABLE IF EXISTS exercise");
});

describe("POST /api/users/:_id/exercises", () => {
  test("it should return status 400 when there is no user with such id", async (done) => {
    const res = await request(app).post("/api/users/999/exercises").send({
      duration: 10,
      description: "desc",
    });
    expect(res.status).toBe(404);
    done();
  });

    test("it should return error message if there is no user with such id", async (done) => {
        const res = await request(app).post("/api/users/999/exercises").send({
          duration: 10,
          description: "desc",
        });
        expect(res.body.error).toBe("there is no user with ID 999");
        done();
    });
  
    test("it should use current date if date is not specified", async (done) => {
        await request(app).post("/api/users ").send({
          username: "user1",
        });
      const res = await request(app).post("/api/users/1/exercises").send({
        duration: 10,
        description: "desc",
      });
      const currDate = new Date().toISOString().split("T")[0];

      expect(res.body.date).toEqual(currDate);
      done();
    });

    test("it should response with object with properties: userId, exerciseId, duration, description, date", async (done) => {
      const expectedObject = {
        userId: 1,
        exerciseId: 2,
        duration: 20,
        description: "description",
        date: "2022-11-17",
      };

      const res = await request(app).post("/api/users/1/exercises").send({
        duration: 20,
        description: "description",
        date: "2022-11-17",
      });

      expect(res.body).toMatchObject(expectedObject);
      done();
    });

    test("it should response with status 400 when duration is missing", async (done) => {
      const res = await request(app).post("/api/users/1/exercises").send({
        description: "desc",
      });
      expect(res.status).toBe(400);
      done();
    });

    test("it should response with status 400 when description is missing", async (done) => {
      const res = await request(app).post("/api/users/1/exercises").send({
        duration: 20,
      });
      expect(res.status).toBe(400);
      done();
    });
});

describe("GET /api/users/:_id/logs?[from][&to][&limit]", () => {
    test("it should return logs with length 5", async (done) => {
        await request(app).post("/api/users ").send({
            username: "user2",
        });
        await request(app).post("/api/users/2/exercises").send({
            duration: 10,
            description: "description1",
            date: "2022-12-01",
        });
        await request(app).post("/api/users/2/exercises").send({
            duration: 10,
            description: "description2",
            date: "2022-12-05",
        });
        await request(app).post("/api/users/2/exercises").send({
            duration: 10,
            description: "description3",
            date: "2022-12-10",
        });
        await request(app).post("/api/users/2/exercises").send({
            duration: 10,
            description: "description4",
            date: "2022-12-15",
        });
        await request(app).post("/api/users/2/exercises").send({
            duration: 10,
            description: "description5",
            date: "2022-12-20",
        });
        const res = await request(app).get("/api/users/2/logs");
        expect(res.body.logs.length).toBe(5);
        done();
    });

    test("it should return count of exercises - 5", async (done) => {
        const res = await request(app).get("/api/users/2/logs");
        expect(res.body.count).toBe(5);
        done();
    });

    test("it should return count of exercises - 2 from 2022-12-15", async (done) => {
        const res = await request(app).get("/api/users/2/logs?from=2022-12-15");
        expect(res.body.count).toBe(2);
        done();
    });

    test("it should return count of exercises - 4 to 2022-12-15", async (done) => {
        const res = await request(app).get("/api/users/2/logs?to=2022-12-15");
        expect(res.body.count).toBe(4);
        done();
    });

    test("it should return count of exercises - 3 from 2022-12-01 to 2022-12-10", async (done) => {
      const res = await request(app).get(
        "/api/users/2/logs?from=2022-12-01&to=2022-12-10"
      );
      expect(res.body.count).toBe(3);
      done();
    });

    test("it should return count of exercises - 2 when limit 2", async (done) => {
      const res = await request(app).get(
        "/api/users/2/logs?limit=2"
      );
      expect(res.body.count).toBe(5);
      done();
    });

    test("it should return number of exercises(logs length) - 5 when limit 2", async (done) => {
      const res = await request(app).get("/api/users/2/logs?limit=2");
      expect(res.body.logs.length).toBe(2);
      done();
    });

    test("it should return number of exercises(logs length) - 1 when limit 1 with from and to date", async (done) => {
      const res = await request(app).get(
        "/api/users/2/logs?from=2022-12-01&to=2022-12-10&limit=1"
      );
      expect(res.body.logs.length).toBe(1);
      done();
    });

    test("it should return number of exercises(logs length) - 4 when limit 4 with from date", async (done) => {
      const res = await request(app).get(
        "/api/users/2/logs?from=2022-12-01&limit=4"
      );
      expect(res.body.logs.length).toBe(4);
      done();
    });

    test("it should return number of exercises(logs length) - 2 when limit 2 with to date", async (done) => {
      const res = await request(app).get(
        "/api/users/2/logs?to=2022-12-10&limit=2"
      );
      expect(res.body.logs.length).toBe(2);
      done();
    });
});