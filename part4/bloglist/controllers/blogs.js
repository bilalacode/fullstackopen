const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("express-async-errors");

blogRouter.get("/", async (request, response) => {
  const dedicatedToken = jwt.verify(request.token, process.env.SECRET);

  const result = await Blog.find({user: dedicatedToken.id}).populate("user", { name: 1, username: 1 });
  response.status(200).json(result);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
   
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
 

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const dedicatedToken = jwt.verify(request.token, process.env.SECRET);

  if (!dedicatedToken.id) {
    return response.status(401).json({ error: "Invalid Token" });
  }


  const user =
    request.user !== null
      ? request.user
      : await User.findById(dedicatedToken.id);


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blog = user.blog.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {


  const dedicatedToken = jwt.verify(request.token, process.env.SECRET);
  const user =
    request.user !== null ? request.user : User.findById(dedicatedToken);

    
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

blogRouter.put("/:id", async (request, response) => {

  const body = request.body;
  const dedicatedToken = jwt.verify(request.token, process.env.SECRET);

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: dedicatedToken.id
  };

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    
  return response.status(201).json(result)
});

module.exports = blogRouter;
