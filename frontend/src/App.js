// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="appContainer">
        <header>
          <Navigation className="Navigation" isLoaded={isLoaded} />
        </header>
        <main>
          {isLoaded && (
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
            </Switch>
          )}
        </main>
        <footer>
          <Footer  />
        </footer>
      </div>
    </>
  );
}

export default App;
