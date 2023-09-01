import "../styles/SignUpForm.css";
import { manageNotification } from "../reducers/notificationSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../services/users"

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const username = event.target.username.value
      const name = event.target.name.value
      const password = event.target.password.value
      await userService.signUpUser({username, name, password})
      dispatch(manageNotification("Sign up successful. Please login now."));


      navigate("/Login"); 
    } catch (error) {
      dispatch(manageNotification(error.message));
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSignUp}>
        <div className="signup-input-group">
          <label htmlFor="username">Username</label>
          <input
            required
            type="text"
            id="username"
            placeholder="Enter your username"
          />
        </div>
        <div className="signup-input-group">
          <label htmlFor="name">Name</label>
          <input required type="text" id="name" placeholder="Enter your name" />
        </div>
        <div className="signup-input-group">
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
