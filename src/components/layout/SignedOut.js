import React from "react";
import { NavLink } from "react-router-dom";

const SignedOut = () => {
  return (
    <div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/sign-up" className="nav-link">
            SIGNUP
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/sign-in" className="nav-link">
            LOGIN
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SignedOut;
