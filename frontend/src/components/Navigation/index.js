// frontend/src/components/Navigation/index.js

import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from "../../images/logo.png"
import {useHomepageAnimation} from "../../context/HomepageAnimationContext"
import DemoUser from "../DemoUser";

function Navigation({ isLoaded }){
  const {setActive} = useHomepageAnimation();
  const sessionUser = useSelector(state => state.session.user);
  const [showEventsMenu, setShowEventsMenu] = useState(false);
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



  const openEventsMenu = () => {
    if (showEventsMenu) return;
    setShowEventsMenu(true);
  };

  useEffect(() => {
    if (!showEventsMenu) return;

    const closeMenu = () => {
      setShowEventsMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showEventsMenu]);

  const addActive = ()=>{
    setActive("genreBoard");
    return;
  }

  const addActive2 = ()=>{
    setActive("dateBoard");
    return;
  }

  const addActive3 = ()=>{
    setActive("placeBoard");
    return;
  }

  const removeActive = ()=>{
    setActive("");
    return;
  }
  return (
    <>
      <div className = "navBar">
        <div className = "navBarContainer">
          <div className="webNameAndDemoUser">
            <div className="webName">MUSIC DOT</div>
            <DemoUser />
          </div>
          <div className="navLinks">
            <NavLink className ="navHomeLink" onClick={removeActive} exact to="/">HOME</NavLink>
            <NavLink onClick={openEventsMenu} className ="navEventsLink" exact to="/">EVENTS</NavLink>
            <NavLink className ="navTicketsLink" exact to="/">TICKETS</NavLink>
            <NavLink className ="navMyEventsLink" exact to="/">My EVENTS</NavLink>
            <NavLink className ="navBookmarksLink" exact to="/bookmarks">BOOKMARKS</NavLink>
          </div>
          <div className="navEventsLinkDropDown">
            {showEventsMenu && (
              <ul className="dropdown-events-menu">
                <div className="dropdown-events-menu-genres" ><a onClick={addActive}>GENRES</a></div>
                <div className="dropdown-events-menu-date" ><a onClick={addActive2}>DATES</a></div>
                <div>
                  <a className="dropdown-events-menu-places" onClick={addActive3} >VENUES</a>
                </div>
              </ul>
            )}
          </div>
          <div className="logoAndAuth">

            <img className="logo" src={logo} alt="logo"/>
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
