import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogsView from "./components/BlogsView";
import BlogFullView from "./components/BlogFullView";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "./reducers/blogSlice";
import { useEffect } from "react";
import Notification from "./components/Notification";
import Logout from "./components/Logout";
import { loginUser } from "./reducers/authSlice";
import CreateBlog from "./components/CreateBlog";
import AuthorsPage from "./components/AuthorsPage";
import { getUsersRequest } from "./reducers/userSlice";
import SignUpForm from "./components/SignUpForm";
import "./styles/App.css";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);
  // const authCheck = useSelector(state => state.auth)
  useEffect(() => {
    if (window.localStorage.userData) {
      const userData = JSON.parse(window.localStorage.userData);
      dispatch(loginUser({ user: userData.user, token: userData.token }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(getUsersRequest());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<BlogsView blogs={blogs} />} />
          <Route path="/Authors" element={<AuthorsPage users={users} />} />
          <Route path="/About" element={<h1>About</h1>} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/:id" element={<BlogFullView blogs={blogs} />} />
          <Route path="/Create" element={<CreateBlog />} />
          <Route path="/Signup" element={<SignUpForm />} />
        </Routes>
      </Router>
      <Notification />
    </>
  );
};

export default App;
