import React from "react";
import { Link } from "react-router-dom";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import Logo from "../../assets/logo.png";
import { connect } from "react-redux";

const Navbar = props => {
  const { auth, profile } = props;
  const links = auth.uid ? <SignedIn name={profile} /> : <SignedOut />;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <Link to="/" className="navbar-brand">
        <img
          src={Logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        myCoPilot
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav ml-auto">{links}</div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Navbar);
