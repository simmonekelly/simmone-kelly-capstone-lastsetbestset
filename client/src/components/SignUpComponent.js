import React from "react";

function SignUpComponent(props) {
  const { handleSignup } = props;
  return (
    <div>
      <h1>Sign Up Below</h1>
      <form onSubmit={handleSignup}>
        <div className="">
          Username: <input type="text" name="username" />
        </div>
        <div className="">
          Name: <input type="text" name="name" />
        </div>
        <div className="">
          Password:{" "}
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
