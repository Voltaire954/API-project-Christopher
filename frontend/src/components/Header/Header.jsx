// Header.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css"; // Import your CSS for styling
import logo from "/home/christopher/API-project-Christopher/frontend/src/components/Header/Airbnb-Logo--Streamline-Flex-Neon.png";

function Header() {
  return (
    <header className="app-header">
      <NavLink to="/" className="logo">
        <img src={logo} alt="App Logo" /> {/* Update with your logo path */}
        <span>anibnb</span> {/* Replace with your app name */}
      </NavLink>
      <div className="search-bar">
        <div className="search-bar-text">Anywhere</div>
        <div className="search-bar-text">Any week</div>
        <div className="search-bar-text2">Add guests</div>
      </div>

      {/* Here you can add your Login/Signup or User Menu buttons */}
      {/* <NavLink to="/login" className="auth-button">
          Log In
        </NavLink>
        <NavLink to="/signup" className="auth-button">
          Sign Up
        </NavLink> */}
      {/* If authenticated, show User Menu button */}
      {/* <button onClick={toggleUserMenu}>User Menu</button> */}
    </header>
  );
}

export default Header;
