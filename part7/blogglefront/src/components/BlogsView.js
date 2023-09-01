import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/BlogsView.css";

const BlogsView = ({ blogs }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = [...blogs]
    .reverse()
    .slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="blogs">

      {blogs ? (
        currentBlogs.map((blog) => (
          <div className="blogindividual" key={blog.id}>
            <h1 className="blogtitle">{blog.title}</h1>
            <h3 className="author">{blog.author}</h3>
            <p className="metadescription">{blog.metaDescription}</p>
            <Link to={`/${blog.id}`}>Read full article.</Link>
          </div>
        ))
      ) : (
        <p>Loading blogs...</p>
      )}
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-button ${
              index + 1 === currentPage ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogsView;
