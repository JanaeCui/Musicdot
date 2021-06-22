import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./DemoUser.css"

function DemoUser() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
      e.preventDefault();
      return dispatch(sessionActions.login({ credential, password }))

    };

    return (
        <form onSubmit={handleSubmit}>

          <div style={{display:"none"}} className="inputGroup1">
            <input
                className="inputDiv1"
                type="text"
                value={credential}
                onChange={() => setCredential("Demo-Jia")}
            />
          </div>
          <div style={{display:"none"}} className="inputGroup2">
            <input
                className="inputDiv2"
                type="password"
                value={password}
                onChange={() => setPassword("password")}
            />
          </div>
          <div className="DemoUserButtonDiv">
            <button className="DemoUserButton" type="submit">DEMO USER</button>
          </div>
        </form>
      );
}

export default DemoUser;
