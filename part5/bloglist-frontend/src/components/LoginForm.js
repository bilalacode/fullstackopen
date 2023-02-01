const LoginForm = ({ setUserName, setPassword, handleLogin }) => {
  return (
    <>
    <h1>Login Form</h1>
    <form onSubmit={handleLogin}>
      Username: <input onChange={(event) => setUserName(event.target.value)} />
      <br></br>
      Password: <input onChange={(event) => setPassword(event.target.value)} />
      <br></br>
      <button>login</button>
    </form>
    </>
  );
};

export default LoginForm;
