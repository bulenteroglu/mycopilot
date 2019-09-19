import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Time from "../layout/Time";

class Passport extends React.Component {
  state = {
    countries: []
  };

  render() {
    const { names } = this.props;

    const countryList = names.map(name => {
      return (
        <li className="list-group-item" key={name}>
          {name}
        </li>
      );
    });

    if (!this.props.auth.uid) return <Redirect to="/sign-in" />;

    return (
      <div>
        <Time />
        <div
          className="jumbotron container"
          style={{
            marginTop: "1rem",
            backgroundColor: "#fff",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19"
          }}
        >
          <h1 className="display-4">Passport Collection!</h1>
          <p className="lead">
            Here are the lists of the countries you have visited.
          </p>

          <ul className="list-group list-group-flush">{countryList}</ul>
          <br />
          <p className="lead">
            Unlocked {countryList.length} countries so far.
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logbooks: state.firestore.ordered.logbooks,
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Passport);
