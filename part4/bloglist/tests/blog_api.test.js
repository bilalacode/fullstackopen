const mongoose = require("mongoose");
const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const listApiHelper = require("../utils/list_api_helper");

beforeAll(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
});

describe("Api test for sign up, login, and creation of blog", () => {
  const testInfo = {};

  test("A new user is created", async () => {
    const userForTest = {
      name: "userfortest",
      username: "userfortest",
      password: "userfortest",
    };
    const result = await api.post("/api/users").send(userForTest).expect(201);

    testInfo.id = result.body.id;
    expect(result.body.name).toBe("userfortest");
  });

  test("User is able to login and get token", async () => {
    const loginUser = {
      username: "userfortest",
      password: "userfortest",
    };

    const result = await api.post("/api/login").send(loginUser).expect(200);
    expect(result.body.name).toBe("userfortest");
    testInfo.token = `Bearer ${result.body.token}`;
  });

  test("Fails to login if incorrect password", async () => {
    const wrongUser = {
      username: "userfortest",
      password: "wrong",
    };

    await api.post("/api/login").send(wrongUser).expect(401);
  });

  test("Blogs can be added", async () => {
    await api
      .post("/api/blogs")
      .send(listApiHelper.initialBlogs[0])
      .set("Authorization", testInfo.token)
      .expect(201);

    await api
      .post("/api/blogs")
      .send(listApiHelper.initialBlogs[1])
      .set("Authorization", testInfo.token)
      .expect(201);

    const blogsInDb = await listApiHelper.blogsInDb();

    expect(blogsInDb).toHaveLength(listApiHelper.initialBlogs.length);
  });

  test("Blog with 0 like can be added", async () => {
    const result = await api
      .post("/api/blogs")
      .send(listApiHelper.blogWithNoLikes)
      .set("Authorization", testInfo.token);

    expect(result.body.likes).toBe(0);
  });

  test("Blog new is missing", async () => {
    const noNameBlog = new Blog({
      url: "test.com",
      likes: 1000,
    });

    await api
      .post("/api/blogs")
      .send(noNameBlog)
      .expect(400)
      .set("Authorization", testInfo.token);
  });

  test("Deleting a specific blog and return a 204", async () => {
    const blogAtStart = await listApiHelper.blogsInDb();
    const blogToDelete = blogAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
      .set("Authorization", testInfo.token);
    const blogAtTheEnd = await listApiHelper.blogsInDb();
    expect(blogAtTheEnd).toHaveLength(blogAtStart.length - 1);
    const blogsAfterDelete = blogAtTheEnd.map((blog) => blog.title);

    expect(blogsAfterDelete).not.toContain(blogToDelete.title);
  });
  test("Update the number of likes in the first blog", async () => {
    const blogAtStart = await listApiHelper.blogsInDb();
    const blogToUpdate = blogAtStart[0];
    const response = await listApiHelper.updateLikes(blogToUpdate, 1234);

    expect(response.likes).toBe(1234);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
