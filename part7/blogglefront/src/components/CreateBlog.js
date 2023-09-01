import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postABlog } from "../reducers/blogSlice";
import { useNavigate } from "react-router-dom";
import "../styles/CreateBlog.css";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authCheck = useSelector((state) => state.auth);

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;
    const newBlog = await dispatch(postABlog(title, content));
    if (newBlog && newBlog.id) {
      navigate(`/${newBlog.id}`);
    }
  };

  if (!authCheck.isLoggedIn) {
    return (
      <p>
        In order to create a blog, you need to <Link to="/Login">login</Link>{" "}
        first.
      </p>
    );
  }

  return (
    <div className="create-blog">
      <h2>Create a New Blog</h2>
      <form onSubmit={handleBlogSubmit}>
        <div className="input-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" placeholder="Enter blog title" />
        </div>
        <div className="input-group">
          <label htmlFor="content">Content:</label>
          <textarea id="content" placeholder="Enter blog content"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
