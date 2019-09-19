import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import Time from "../layout/Time";

class Dashboard extends React.Component {
  state = {
    time: ""
  };

  componentDidMount() {
    this.setState({
      state: this.state
    });
  }

  render() {
    const { profile, auth } = this.props;

    if (!auth.uid) return <Redirect to="/sign-in" />;

    return (
      <div className="container">
        <Time />
        <div
          className="jumbotron"
          style={{
            marginTop: "1rem",
            backgroundColor: "#FFF",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19"
          }}
        >
          <h1 className="display-4">Hello, {profile.username}!</h1>
          <p className="lead">Powerful Electronic Logbook. Built for Pilots.</p>
          <hr className="my-4" />
          <p>Less paper work, less hassle.</p>
          <p className="lead">
            <Link to="/logbook">
              <button className="btn btn-info" href="#">
                Logbook
              </button>
            </Link>
          </p>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div
              className="card"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19"
              }}
            >
              <div className="card-body">
                <h5 className="card-title">Request METAR?</h5>
                <p className="card-text">
                  A METAR weather report is predominantly used by pilots in
                  fulfillment of a part of a pre-flight weather briefing.
                </p>
                <Link to="/metar">
                  <button className="btn btn-info">METAR</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div
              className="card"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19"
              }}
            >
              <div className="card-body">
                <h5 className="card-title">View Passport?</h5>
                <p className="card-text">
                  Would you like to see all the countries that you've been too?
                  View your passport.
                </p>
                <Link to="/passport">
                  <button className="btn btn-info">Passport</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "logbooks",
      orderBy: ["createdAt", "asc"]
    }
  ])
)(Dashboard);
