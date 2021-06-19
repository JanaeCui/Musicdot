// frontend/src/components/Navigation/index.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from "../../images/logo.png"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton className = "profileButton" user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink className="navSignUp" to="/signup">SIGN UP</NavLink>
      </>
    );
  }

  return (
    <>
      <div className = "navBar">
        <div className = "navBarContainer">
          <div className="webName">MUSIC DOT</div>

          <div className="navLinks">
            <NavLink className ="navHomeLink" exact to="/">HOME</NavLink>
            <NavLink className ="navEventsLink" exact to="/">EVENTS</NavLink>
            <NavLink className ="navTicketsLink" exact to="/">TICKETS</NavLink>
            <NavLink className ="navMyEventsLink" exact to="/">My EVENTS</NavLink>
            <NavLink className ="navBookmarksLink" exact to="/">BOOKMARKS</NavLink>
          </div>
          <div className="logoAndAuth">

            <img className="logo" src={logo} />
          </div>
        </div>

      </div>
      <div className={sessionUser? "auth1":"auth2" }>
        {isLoaded && sessionLinks}
      </div>
    </>
  );
}

export default Navigation;
