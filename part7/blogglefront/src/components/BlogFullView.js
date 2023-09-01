  import React, { useEffect } from "react";
  import "../styles/BlogFullView.css";
  import { useParams } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchSingleBlog, toggleLike } from "../reducers/blogSlice"; 
  import CommentSection from "./CommentSection";

  const BlogFullView = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const blog = useSelector((state) =>
      state.blogs.find((blog) => blog.id === id)
    );
    const user = useSelector((state) => state.auth.user); 

    useEffect(() => {
      if (!blog) {
        dispatch(fetchSingleBlog(id));
      }
    }, [dispatch, blog, id]);

    const handleLikeClick = () => {
      dispatch(toggleLike(id));
    };

    const userHasLiked =
      blog && user && blog.likes.some((like) => like.user === user.id);

    if (!blog) {
      return <p>Loading blog...</p>;
    }

    return (
      <>
        <div className="blog-full-view">
          <h1 className="blog-title">{blog.title}</h1>
          <div className="blog-meta">
            <span className="blog-author">By {blog.author}</span>
            <span className="blog-likes">
              <button
                className={userHasLiked ? "liked" : ""}
                onClick={handleLikeClick}
              >
                {userHasLiked ? "❤️" : "🖤"}
              </button>
              {blog.likes.length} Likes
            </span>
          </div>
          <div className="blog-content">{blog.content}</div>
        </div>
        <div className="comment-section">
          <CommentSection blog={blog} />
        </div>
      </>
    );
  };
  
  export default BlogFullView;