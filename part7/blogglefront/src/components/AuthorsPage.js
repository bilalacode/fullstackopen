/* eslint-disable array-callback-return */
import React, { useState } from "react";
import BlogsView from "./BlogsView";
import "../styles/AuthorsPage.css";

const AuthorsPage = ({ users }) => {
  const [expandedAuthor, setExpandedAuthor] = useState(null);

  const toggleBlogs = (userId) => {
    if (expandedAuthor === userId) {
      setExpandedAuthor(null);
    } else {
      setExpandedAuthor(userId);
    }
  };

  return (
    <div>
      {users.map((user) => {
        if (user.blog.length !== 0) {
          return (
            <div key={user.id} className="author-container">
              <h2 onClick={() => toggleBlogs(user.id)}>
                {user.name} ({user.blog.length} blogs)
              </h2>
              {expandedAuthor === user.id && <BlogsView blogs={user.blog} />}
            </div>
          );
        }
      })}
    </div>
  );
};

export default AuthorsPage;
