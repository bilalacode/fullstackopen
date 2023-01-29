const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("express-async-errors");

// const getTokenFron = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.startsWith("Bearer ")) {
//     return authorization.replace("Bearer ", "");
//   }

//   return null;
// };

blogRouter.get("/", async (request, response) => {
  const result = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.status(200).json(result);
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
  // console.log(body)
  const dedicatedToken = jwt.verify(request.token, process.env.SECRET);

  if (!dedicatedToken.id) {
    return response.status(401).json({ error: "Invalid Token" });
  }

  //code for linking blogs with respective users
  // const user = await User.findById(dedicatedToken.id);

  const user =
    request.user !== null
      ? request.user
      : await User.findById(dedicatedToken.id);

  // console.log(user)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  // console.log("this user here", user.tree.blog)
  user.blog = user.blog.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
  // blog
  //   .save()
  //   .then((savedBlog) => {
  //     response.status(201).json(savedBlog);
  //   })
  //   .catch((error) => next(error));
});

blogRouter.delete("/:id", async (request, response) => {
  // Blog.findByIdAndDelete(request.params.id)
  //   .then((result) => {
  //     response.status(204).end();
  //   })
  //   .catch((error) => next(error));

  const dedicatedToken = jwt.verify(request.token, process.env.SECRET);
  const user =
    request.user !== null ? request.user : User.findById(dedicatedToken);
  // const userId = dedicatedToken.id;

  const blog = await Blog.findById(request.params.id);
  if (!blog) return response.status(404).json({ error: "Blog not found" });

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({
      error: "User doens't own the blog that is requested to be deleted",
    });
  }

  await blog.remove();
  return response.status(204).json({ message: "Successfully deleted" });
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
