import Blog from "./Blog";
import blogService from "../services/blogs.js";
import { useEffect } from "react";


const Display = ({ setBlogs, blogs, user }) => {
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  return (
    <>
      <h2>blogs</h2>
      <p>
        {user} logged in.
        <button type="submit" onClick={() => {
            window.localStorage.clear()
            window.location.reload()
        }}>
          logout
        </button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Display;
