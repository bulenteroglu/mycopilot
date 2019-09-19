import React from "react";
import Notifications from "../dashboard/Notifications";
import LogbookList from "../logbook/LogbookList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class UserLogbook extends React.Component {
  render() {
    const { logbooks, auth } = this.props;

    if (!auth.uid) return <Redirect to="/sign-in" />;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <LogbookList logbooks={logbooks} />
          </div>
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

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "logbooks"
    }
  ])
)(UserLogbook);
