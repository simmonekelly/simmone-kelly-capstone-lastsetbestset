import React from "react";

function SignUpComponent(props) {
  const { handleSignup } = props;
  return (
    <div className="login-container">
      <h1>Sign Up Below</h1>
      <form onSubmit={handleSignup}>
        <div className="form-group">
        <p>Username:</p>
        <input type="text" name="username" />
        </div>
        <div className="form-group">
          <p>Name:</p>
          <input type="text" name="name" />
        </div>
        <div className="form-group">
          <p>Password:{" "}</p>
          <input type="password" name="password" autoComplete="true" />
        </div>
        <button className="" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpComponent;
