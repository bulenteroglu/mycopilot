import React from "react";
import moment from "moment";

const Time = () => {
  return (
    <div
      className="card"
      style={{
        width: "4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        textTransform: "uppercase",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19"
      }}
    >
      <span style={{ color: "#999999", fontWeight: "600" }}>
        {moment.utc().format("HH:mm")}
      </span>
      <strong style={{ color: "grey", fontWeight: "600" }}>zulu</strong>
    </div>
  );
};

export default Time;
