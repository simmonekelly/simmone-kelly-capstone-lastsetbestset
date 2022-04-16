import React from "react";

function LoginComponent(props) {
  const { handleLogin } = props;
  return (
    <div>
      <h1>Log In Below</h1>
      <form onSubmit={handleLogin}>
        <div className="">
          Username: <input type="text" name="username" />
        </div>
        <div className="">
          Password:{" "}
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
