// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
    <div class="btn-group open">
      <div className="profileButtons">
        <button className="btn btn-primary" >
          <i className="fa fa-user fa-fw" />
        </button>
        <a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#">
          <span  onClick={openMenu} class="fa fa-caret-down" title="Toggle dropdown menu"></span>
        </a>
      </div>
      <div>
        {showMenu && (
          <ul className="dropdown-menu">
            <div className="dropdown-menu-userName" >{user.username}</div>
            <div className="dropdown-menu-email" >{user.email}</div>
            <div>
              <button className="dropdown-menu-logOut" onClick={logout}>Log Out</button>
            </div>
          </ul>
        )}
      </div>

    </div>

    {/* <i class="fa fa-user fa-fw"></i>
    <a class="btn btn-primary dropdown-toggle"  href="#">
      <span onClick={openMenu} class="fa fa-caret-down" title="Toggle dropdown menu"></span>
    </a>
    {showMenu && (
      <ul className="dropdown-menu">
        <div className="dropdown-menu-userName">{user.username}</div>
        <div className="dropdown-menu-email">{user.email}</div>
        <div>
          <button className="dropdown-menu-logOut" onClick={logout}>LOG OUT</button>
        </div>
      </ul>
    )} */}

  </>
  );
}

export default ProfileButton;
