import "../styles/LoginForm.css";
import { manageNotification } from "../reducers/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { manageUserLogin } from "../reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const authCheck = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      dispatch(
        manageUserLogin({
          username: event.target.username.value,
          password: event.target.password.value,
        })
      );
    } catch (error) {
      dispatch(manageNotification(error.message));
    }
  };

  useEffect(() => {
    if (authCheck.isLoggedIn) {
      navigate("/");
    }
  }, [authCheck.isLoggedIn, navigate]);

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <div className="signup-link">
        Don't have an account? <Link to="/Signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
