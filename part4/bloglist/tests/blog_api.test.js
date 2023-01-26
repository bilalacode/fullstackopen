const listApiHelper = require("../utils/list_api_helper");

const mongoose = require("mongoose");
const supertest = require("supertest");
const { response } = require("../app");

const app = require("../app");
const blog = require("../models/blog");

const api = supertest(app);

const Blog = require("../models/blog");

const clearBlogsAndAddTwo = async () => {
  await Blog.deleteMany({});

  // let noteObj = new Blog(listApiHelper.initialBlogs[0]);
  // await noteObj.save();

  // noteObj = new Blog(listApiHelper.initialBlogs[1]);
  // noteObj.save();

  const blogObj = listApiHelper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObj.map((blog) => blog.save());
  await Promise.all(promiseArray);
};

beforeEach(async () => {
  await clearBlogsAndAddTwo();
});

test("Blogs returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("All blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  const blog = response;
  expect(blog.body).toHaveLength(listApiHelper.initialBlogs.length);
});

test("Blog generate unique id", async () => {
  const response = await listApiHelper.uniqueId();
  expect(response).toBeDefined();
});

test("A new blog is added", async () => {
  //  await clearBlogsAndAddTwo()

  const newBlog = {
    title: "Helloooo",
    author: "anon",
    url: "test.com",
    likes: 120,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogOnEnd = await listApiHelper.blogsInDb();
  expect(blogOnEnd).toHaveLength(listApiHelper.initialBlogs.length + 1);
});

test("Blog added with no likes adds 0", async () => {
  const likes = await listApiHelper.blogWithNoLikes();

  expect(likes).toBe(0);
});

test("Blog new is missing", async () => {
  const noNameBlog = new Blog({
    url: "test.com",
    likes: 1000,
  });

  await api.post("/api/blogs").send(noNameBlog).expect(400);
});

test("Deleting a specific blog and return a 204", async () => {
  const blogAtStart = await listApiHelper.blogsInDb();
  const blogToDelete = blogAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  const blogAtTheEnd = await listApiHelper.blogsInDb();
  expect(blogAtTheEnd).toHaveLength(listApiHelper.initialBlogs.length - 1);
  const blogsAfterDelete = blogAtTheEnd.map((blog) => blog.title);

  expect(blogsAfterDelete).not.toContain(blogToDelete.title);
});

test("Update the number of likes in the first blog", async () => {
  await clearBlogsAndAddTwo();
  const blogAtStart = await listApiHelper.blogsInDb();
  const blogToUpdate = blogAtStart[0];
  const response = await listApiHelper.updateLikes(blogToUpdate, 1234);

  expect(response.likes).toBe(1234);
});

afterAll(async () => {
  await mongoose.connection.close();
});
