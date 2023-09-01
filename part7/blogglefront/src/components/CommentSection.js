import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/CommentSection.css";
import { addComment } from "../reducers/blogSlice";
import { useRef } from "react";
import { useDispatch } from "react-redux";

const CommentSection = ({ blog }) => {
    const {comments, id} = blog
  const authCheck = useSelector((state) => state.auth);
  const commentInputRef = useRef(null);
  const dispatch = useDispatch()

  const handleAddComment = (event) => {
    event.preventDefault();
    const content = commentInputRef.current.value;
    dispatch(addComment(content, id));
    commentInputRef.current.value = "";
  };
  return (
    <div className="comments-section">
      <h3>Comments:</h3>
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <p>{comment.content}</p>
          <span>By {comment.user.name}</span>
        </div>
      ))}
      {authCheck.isLoggedIn && (
        <div className="add-comment-section">
          <h4>Add a Comment:</h4>
          <form onSubmit={handleAddComment}>
            <input
              ref={commentInputRef} 
              name="commentbox"
              type="text"
              placeholder="Your comment here..."
              required
            />
            <button type="submit">Comment</button>
          </form>
        </div>
      )}

      {!authCheck.isLoggedIn && (
        <div className="login-prompt">
          In order to comment and like <Link to="/Login">please login.</Link>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
