import React from "react";
import airportLists from "../../assets/API/airportList.json";
import { connect } from "react-redux";

class PassportCards extends React.Component {
  state = {
    notBeen: "grayscale(100%)",
    haveBeen: "grayscale(0%)"
  };

  render() {
    return (
      <div className="card" style={{ width: "10rem", marginTop: "1rem" }}>
        <img
          src={this.props.flag}
          style={{
            width: "100%",
            height: "100%",
            filter: `${this.state.notBeen}`
          }}
        />
        <div className="card-body">
          <p className="card-text text-center">{this.props.name}</p>
        </div>
      </div>
    );
  }
}

export default PassportCards;
