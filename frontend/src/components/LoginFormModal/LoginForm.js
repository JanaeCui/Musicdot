// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";


function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="loginTitle">
          LOG IN
      </div>
      <ul className="errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className="inputGroup1">
        <label>
          USERNAME OR EMAIL
          <input
            className="inputDiv1"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="inputGroup2">
        <label>
        PASSWORD
          <input
            className="inputDiv2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="loginButtonDiv">
        <button className="loginButton" type="submit">LOG IN</button>
      </div>
      <a href="/signup" className="signUpPromp">
          Do not have an account, please sign up!!
      </a>
    </form>
  );
}

export default LoginForm;
