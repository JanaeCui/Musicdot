// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import Homepage from "../Homepage"

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="outerContainer">

      <Homepage />
      <div className="signUpFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="signUpTitle">
            SIGN UP
          </div>
          <ul className="errors">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className="signUpGroup1">
            <label>
              Email
              <input
                className="singUpDiv1"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="signUpGroup2">
            <label>
              Username
              <input
                className="inputDiv2"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="signUpGroup3">
            <label>
              Password
              <input
                className="singUpDiv3"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="signUpGroup4">
            <label>
              Confirm Password
              <input
                className="singUpDiv4"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="signUpButtonDiv">
            <button className="signUpButton" type="submit">Sign Up</button>
          </div>
        </form>
      </div>
      <div className="signUpBackground"></div>
    </div>
  );
}

export default SignupFormPage;
