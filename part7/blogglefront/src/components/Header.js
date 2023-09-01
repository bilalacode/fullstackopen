import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const authCheck = useSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = window.localStorage.getItem("darkmode");
    return storedDarkMode ? storedDarkMode === "true" : false;
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      localStorage.setItem("darkmode", newDarkMode.toString());
      return newDarkMode;
    });
  };
  return (
    <header className={darkMode ? "dark" : ""}>
      <div className="logo-container">
        <Link to="/" className="logo">
          Bloggle
        </Link>
        {authCheck.isLoggedIn && (
          <div className="user-info">Logged in as {authCheck.user.name}</div>
        )}
      </div>
      <div className="navbarlinks">
        <Link to="/">Home</Link>
        <Link to="/Authors">Authors</Link>
        {authCheck.isLoggedIn && <Link to="/Create">Create</Link>}
        <Link to={!authCheck.isLoggedIn ? "/Login" : "/Logout"}>
          {!authCheck.isLoggedIn ? "Login" : "Logout"}
        </Link>

        <span onClick={toggleDarkMode} className="moon-icon">
          {darkMode ? "🌞" : "🌙"}
        </span>
      </div>
    </header>
  );
};

export default Header;
