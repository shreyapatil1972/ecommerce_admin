import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-left">
        {location.pathname !== "/login" && (
          <Link to="/LoginPage" className="nav-link">Login</Link>
        )}
        {location.pathname !== "/register" && (
          <Link to="/RegisterPage" className="nav-link">Register</Link>
        )}
      </div>
      <div className="nav-right">
        <h1 className="logo">Trendlux</h1>
      </div>
    </nav>
  );
};

export default Navbar;
