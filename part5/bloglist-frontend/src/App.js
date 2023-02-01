import { useEffect, useState } from "react";
import blogService from "./services/blogs";
import loginService from "./services/loginService";
import LoginForm from "./components/LoginForm";
import Display from "./components/Display";

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
    console.log(blogNew);
    try {
      const response = await blogService.postABlog(blogNew);
      setBlogNew({ title: "", author: "", url: "" });
      setBlogs(blogs.concat(response));
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log("username", userName, "password", password);
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

      // console.log(blogs)
      // console.log(userToLogin.token);
    } catch (exception) {
      console.log("this error", exception);
    }
  };

  if (user !== null) {
    return (
      <>
        <Create
          blogNew={blogNew}
          setBlogNew={setBlogNew}
          createBlog={createBlog}
        />
        <Display setBlogs={setBlogs} blogs={blogs} user={user.name} />
      </>
    );
  } else {
    return (
      <LoginForm
        setUserName={setUserName}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  }
};

export default App;
