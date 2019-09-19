import React from "react";
import LogbookSummary from "./LogbookSummary";
import { Link } from "react-router-dom";

const LogbookList = ({ logbooks }) => {
  return (
    <div>
      {logbooks &&
        logbooks.map(logbook => {
          return (
            <Link
              key={logbook.id}
              to={"/logbook/" + logbook.id}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <LogbookSummary logbook={logbook} key={logbook.id} />
            </Link>
          );
        })}
    </div>
  );
};

export default LogbookList;
