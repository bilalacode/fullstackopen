import { useEffect, useState } from "react";
import blogService from "./services/blogs";
import loginService from "./services/loginService";
import LoginForm from "./components/LoginForm";
import Display from "./components/Display";
import Togglable from "./components/Togglable";

const SuccessMessage = ({ message }) => {
  if (message !== null) {
    return (
      <p
        style={{
          color: "green",
          background: "light-grey",
          fontSize: "50px",
          border: "5px solid #2AA400",
        }}
      >
        {message}
      </p>
    );
  }
};

const ErrorMessage = ({ errorMessage }) => {
  if (errorMessage !== null) {
    return (
      <p
        style={{
          color: "red",
          background: "light-grey",
          fontSize: "50px",
          border: "5px solid red",
        }}
      >
        {errorMessage}
      </p>
    );
  }
};

const Create = ({ blogNew, setBlogNew, createBlog }) => {
  return (
    <>
      <h2>create</h2>
      <form onSubmit={createBlog}>
        title:{" "}
        <input
          value={blogNew.title}
          onChange={({ target }) =>
            setBlogNew({ ...blogNew, title: target.value })
          }
        />
        <br></br>
        author:{" "}
        <input
          value={blogNew.author}
          onChange={({ target }) =>
            setBlogNew({ ...blogNew, author: target.value })
          }
        />
        <br></br>
        url:{" "}
        <input
          value={blogNew.url}
          onChange={({ target }) =>
            setBlogNew({ ...blogNew, url: target.value })
          }
        />
        <br></br>
        <button type={"submit"}>create</button>
      </form>
    </>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogNew, setBlogNew] = useState({ title: "", author: "", url: "" });
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const userJson = window.localStorage.getItem("blogLoginUser");
    if (userJson) {
      const user = JSON.parse(userJson);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const createBlog = async (event) => {
    event.preventDefault();
    // console.log(blogNew);
    try {
      const response = await blogService.postABlog(blogNew);
      setBlogNew({ title: "", author: "", url: "" });
      setBlogs(blogs.concat(response));
      setMessageSuccess("A blog has been added");
      setTimeout(() => setMessageSuccess(null), 5000);
    } catch (error) {
      setErrorMessage(JSON.stringify(error.message));
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userToLogin = await loginService.login({
        username: userName,
        password: password,
      });

      window.localStorage.setItem("blogLoginUser", JSON.stringify(userToLogin));

      setUser(userToLogin);
      setUserName("");
      setPassword("");
      blogService.setToken(userToLogin.token);

      setMessageSuccess("User logged in");

      setTimeout(() => setMessageSuccess(null), 5000);

      // console.log(blogs)
      // console.log(userToLogin.token);
    } catch (error) {
      console.log(error.message);

      setErrorMessage("wrong username or password");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  if (user !== null) {
    return (
      <>
        <SuccessMessage message={messageSuccess} />
        <ErrorMessage errorMessage={errorMessage} />
        <Togglable buttonLabel="new blog">
        <Create
          blogNew={blogNew}
          setBlogNew={setBlogNew}
          createBlog={createBlog}
        />
        </Togglable>
        <Display setBlogs={setBlogs} blogs={blogs} user={user.name} />
      </>
    );
  } else {
    return (
      <>
        {" "}
        <SuccessMessage message={messageSuccess} />
        <ErrorMessage errorMessage={errorMessage} />

        <Togglable buttonLabel="login">
        <LoginForm
          setUserName={setUserName}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
        </Togglable>
       
      </>
    );
  }
};

export default App;
