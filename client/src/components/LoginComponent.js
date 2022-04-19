import React from "react";

function LoginComponent(props) {
  const { handleLogin } = props;
  return (
    <div className="login-container">
      <h1>Log In Below</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <p>Username:</p>
          <input type="text" name="username" />
        </div>
        <div className="form-group">
          <p>Password:{" "}</p>
          <input type="password" name="password" autoComplete="true" />
        </div>
        <button className="" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginComponent;
