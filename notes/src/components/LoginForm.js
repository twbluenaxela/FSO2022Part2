const LoginForm = (props) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={props.handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={props.username}
            id="username"
            name="Username"
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id='password'
            value={props.password}
            name="Password"
            onChange={props.handlePasswordChange}
          />
        </div>
        <button type="submit" id='login-button'>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
