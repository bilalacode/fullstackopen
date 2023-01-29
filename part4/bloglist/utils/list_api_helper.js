const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

const uniqueId = async () => {
  const blog = new Blog({
    title: "Unique blog",
    author: "Unkown",
    url: "test.com",
    likes: 10,
  });

  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const blogWithNoLikes = {
  title: "Blog with no likes",
  author: "anon",
  url: "blog.com",
};

const updateLikes = async (note, numberOfLikes) => {
  const updatedNote = { ...note, likes: numberOfLikes };

  const response = await Blog.findByIdAndUpdate(note.id, updatedNote, {
    new: true,
  });
  return response;
};

module.exports = {
  initialBlogs,
  uniqueId,
  blogsInDb,
  blogWithNoLikes,
  updateLikes,
};
