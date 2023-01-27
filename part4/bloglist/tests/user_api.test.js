const bcrypt = require("bcrypt");
const User = require("../models/user");
const mongoose = require("mongoose");
const supertest = require("supertest");
const userListApiHelper = require("../utils/user_list_api_helper");

const app = require("../app");
const { application } = require("express");
const api = supertest(app);

describe("when initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("testingpass", 10);

    const user = new User({
      name: "bill",
      username: "billahmed",
      passwordHash: passwordHash,
    });

    await user.save();
  });

  test("created username with fresh db", async () => {
    const usersAtStart = await userListApiHelper.userInDb();

    const newUser = {
      name: "Awais Ahmed",
      username: "awais",
      password: "testingit",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const userAtEnd = await userListApiHelper.userInDb();

    expect(userAtEnd).toHaveLength(usersAtStart.length + 1);

    const username = userAtEnd.map((user) => user.name);

    expect(username).toContain(newUser.name);
  });

  test("Username must be unique", async () => {
    const newUser = {
      name: "bill",
      username: "billahmed",
      password: "thisisadummypass",
    };

    const usersAtStart = await userListApiHelper.userInDb();

    const response = await api.post("/api/users").send(newUser).expect(400);

    expect(response.error).toContain("expected `username` to be unique");

    const userAtEnd = await userListApiHelper.userInDb();

    expect(usersAtStart).toEqual(userAtEnd.length);
  });

  

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
