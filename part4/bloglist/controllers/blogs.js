const blogRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs);
  // });

  const result = await Blog.find({}).populate('user', {name: 1, username: 1})

  response.status(200).json(result)

});

blogRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;

  //code for linking blogs with respective users
  const user = await User.findById(body.userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blog = user.blog.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog);
  // blog
  //   .save()
  //   .then((savedBlog) => {
  //     response.status(201).json(savedBlog);
  //   })
  //   .catch((error) => next(error));
});

blogRouter.delete("/:id", (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

blogRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.status(201).json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
