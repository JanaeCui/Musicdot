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
import EventGenrePage from "./components/EventGenrePage";
import EventVenuePage from "./components/EventVenuePage";
import EventDatePage from "./components/EventDatePage";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (

    <>
        <header>
          <Navigation className="Navigation" isLoaded={isLoaded} />
        </header>

          {isLoaded && (
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <Route path="/events/genres">
                <EventGenrePage />
              </Route>
              <Route path="/events/venues">
                <EventVenuePage />
              </Route>
              <Route path="/events/dates">
                <EventDatePage />
              </Route>
            </Switch>
          )}

        <footer>
          <Footer />
        </footer>
    </>

  );
}

export default App;
