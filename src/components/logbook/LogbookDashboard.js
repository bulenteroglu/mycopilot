import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Time from "../layout/Time";

class LogbookDashboard extends React.Component {
  state = {
    newArray: [],
    totalhour: "00:00",
    lastFlight: [],
    arricao: "",
    depicao: "",
    log: false
  };

  componentWillMount() {
    const { auth, logbooks } = this.props;

    {
      logbooks &&
        logbooks.map(logbook => {
          if (logbook.logbookId === auth.uid) {
            this.setState({
              log: true
            });
          }
        });
    }
  }

  componentDidMount() {
    if (!this.state.log) return <Redirect to="/" />;

    if (this.state.log === true) {
      const { auth, logbooks } = this.props;

      {
        logbooks &&
          logbooks.map(logbook => {
            if (auth.uid === logbook.logbookId) {
              this.state.lastFlight.push(logbook);
            }
          });
      }

      var array = this.state.lastFlight;
      var firstElement = array[array.length - 1];

      this.setState({
        depicao: firstElement.depicao,
        arricao: firstElement.arricao
      });

      {
        logbooks &&
          logbooks.map(logbook => {
            if (logbook.logbookId == auth.uid) {
              this.state.newArray.push(logbook.totaltime);
            }
          });

        const test = this.state.newArray.reduce((totalMinutes, time) => {
          const [hours, minutes] = time.split(":").map(Number);
          return totalMinutes + hours * 60 + minutes;
        }, 0);

        this.setState({ totalhour: Math.floor(test / 60) + ":" + (test % 60) });
      }
    }
  }
  render() {
    const { auth, profile, logbooks } = this.props;
    if (!auth.uid) return <Redirect to="/sign-in" />;

    return (
      <div>
        <div className="container">
          <Time />
          <div className="row">
            <div className="col">
              <div
                className="jumbotron"
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#FFF",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19"
                }}
              >
                <h1 className="display-4">@{profile.username}</h1>
                <p className="lead">
                  Our most popular professional logbook complies with JAR
                  regulations for logging flight time in Europe.
                </p>
                <hr className="my-4" />
                <p className="lead">
                  <Link
                    to="/create-logbook"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <button className="btn btn-primary btn-lg">
                      Create Log
                    </button>
                  </Link>
                  <Link
                    to="/logbook-history"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <button
                      className="btn btn-info btn-lg"
                      style={{ marginLeft: ".5rem" }}
                    >
                      View Logbook History
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <Carousel
            totalhour={this.state.totalhour}
            depicao={this.state.depicao}
            arricao={this.state.arricao}
            totalflights={this.state.newArray.length}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logbooks: state.firestore.ordered.logbooks,
    profile: state.firebase.profile,
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(LogbookDashboard);
