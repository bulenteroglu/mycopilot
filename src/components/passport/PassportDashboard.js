import React from "react";
import Passport from "./Passport";
import { connect } from "react-redux";
import airportLists from "../../assets/API/airportList";
import ShowMap from "../map/ShowMap";
import { Redirect } from "react-router-dom";

class PassportDashboard extends React.Component {
  state = {
    newArray: [],
    uniqueArray: [],
    countryName: []
  };

  componentDidMount() {
    {
      this.props.logbooks &&
        this.props.logbooks.map(logbook => {
          if (this.props.auth.uid === logbook.logbookId) {
            {
              airportLists &&
                airportLists.map(airportList => {
                  if (
                    airportList.airportCode === logbook.depicao ||
                    airportList.airportCode === logbook.arricao
                  ) {
                    const temp = this.state.newArray;
                    temp.push(airportList["countryName"]);
                  }
                });
            }
          }
        });
    }
    const uniqueNames = Array.from(new Set(this.state.newArray));
    this.setState({
      uniqueArray: uniqueNames
    });
  }

  render() {
    if (!this.props.auth.uid) return <Redirect to="/sign-in" />;

    return (
      <div className="container">
        <Passport names={this.state.uniqueArray} />
        <ShowMap />
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

export default connect(mapStateToProps)(PassportDashboard);
