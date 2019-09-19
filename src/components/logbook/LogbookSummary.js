import React from "react";
import moment from "moment";
import { connect } from "react-redux";

const LogbookSummary = props => {
  const { logbook, auth, logbooks } = props;

  {
    logbooks && logbooks.map(logbook => {});
  }

  if (auth.uid === logbook.logbookId) {
    return (
      <div
        className="jumbotron text-center"
        style={{
          marginTop: "1rem",
          backgroundColor: "#fff",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19"
        }}
      >
        {moment(logbook.date.toDate()).format("dddd, MMMM Do YYYY")} <br />
        <h1 className="display-4">
          {logbook.depicao} - {logbook.arricao}
        </h1>
        <h1 className="display-10">{logbook.callsign}</h1>
        <small id="emailHelp" className="form-text text-muted">
          User: {logbook.username}
        </small>
        <small id="emailHelp" className="form-text text-muted">
          {moment(logbook.createdAt.toDate()).calendar()}
        </small>
        <hr className="my-1" />
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    logbooks: state.firestore.ordered.logbooks
  };
};

export default connect(mapStateToProps)(LogbookSummary);
