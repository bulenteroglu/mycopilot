import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedIn = props => {
  return (
    <div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/logbook" className="nav-link">
            LOGBOOK
          </NavLink>
        </li>

        <li className="nav-item">
          <a onClick={props.signOut} className="nav-link">
            LOGOUT
          </a>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedIn);
