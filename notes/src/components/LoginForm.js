import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password}) => {


  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
<<<<<<< HEAD
            value={props.username}
            id="username"
=======
            value={username}
>>>>>>> 52bcb433e3aebbf50c5f50ea49607dc8528ab17c
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
<<<<<<< HEAD
            id='password'
            value={props.password}
=======
            value={password}
>>>>>>> 52bcb433e3aebbf50c5f50ea49607dc8528ab17c
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" id='login-button'>login</button>
      </form>
    </div>
  );
};

export default LoginForm
