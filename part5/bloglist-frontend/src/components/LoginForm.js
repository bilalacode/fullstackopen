const LoginForm = ({ setUserName, setPassword, handleLogin }) => {
  return (
    <>
      <h1>Login Form</h1>
      <form onSubmit={handleLogin}>
      Username: <input id="username" onChange={(event) => setUserName(event.target.value)} />
        <br></br>
      Password: <input id="password" onChange={(event) => setPassword(event.target.value)} />
        <br></br>
        <button id="loginbutton">login</button>
      </form>
    </>
  )
}

export default LoginForm
