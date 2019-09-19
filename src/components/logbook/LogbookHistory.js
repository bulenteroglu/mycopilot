import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
// import firebase from "../../config/fbConfig";

const LogbookHistory = props => {
  const { logbook, auth } = props;

  if (!auth.uid) return <Redirect to="/sign-in" />;
  if (logbook) {
    return (
      <div className="container">
        <div
          className="jumbotron  text-center"
          style={{
            marginTop: "1rem",
            backgroundColor: "#fff",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19"
          }}
        >
          <h1 className="display-10">{logbook.callsign}</h1>
          <h1 className="display-4">
            {logbook.depicao} - {logbook.arricao}
          </h1>
          <p className="lead">
            Off Blocks: <strong>{logbook.deptime}</strong> <br />
            On Blocks: <strong>{logbook.arrtime}</strong> <br />
            Aircraft Make, Model and Variant: <strong>{logbook.airtype}</strong>
            <br />
            Registiration: <strong>{logbook.airreg}</strong> <br />
            Pilot in Command: <strong>{logbook.commandpilotname}</strong> <br />
            Total Time: <strong>{logbook.totaltime}</strong> <br />
            Remarks: <strong>{logbook.remarks} </strong>
          </p>
          <hr className="my-4" />
          <p>
            <small id="" className="form-text text-muted">
              Logged by {logbook.username}
            </small>
            <small id="" className="form-text text-muted">
              {moment(logbook.createdAt.toDate()).calendar()}
            </small>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <p>loading logbook...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const logbooks = state.firestore.data.logbooks;
  const logbook = logbooks ? logbooks[id] : null;
  return {
    logbook: logbook,
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
)(LogbookHistory);
