import React from "react";
import axios from "axios";
import ShowMap from "../map/ShowMap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import MapLeaflet from "../map/MapLeaflet";
import Time from "../layout/Time";

class RequestMetar extends React.Component {
  state = {
    metar1: null,
    raw: null,
    nameAirport: "",
    iata: "",
    icao: "",
    runways: [],
    temperature: "",
    dewpoint: "",
    pressure: "",
    windDir: "",
    windSpd: "",
    visibility: "",
    unitAltimeter: "",
    unitAltitude: "",
    unitTemperature: "",
    unitVisibility: "",
    wind_speed: "",
    clouds: [],
    cloud: [],
    lat: 50,
    long: 20,
    zoom: 8,
    mapUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  };

  handleSubmit = e => {
    e.preventDefault();

    axios
      .get(
        `https://avwx.rest/api/metar/${
          this.state.metar1
        }?options=&format=json&onfail=cache`
      )
      .then(res => {
        this.setState({
          raw: res.data.raw,
          temperature: res.data.temperature.value,
          dewpoint: res.data.dewpoint.value,
          pressure: res.data.altimeter.value,
          windDir: res.data.wind_direction.value,
          windSpd: res.data.wind_speed.value,
          visibility: res.data.visibility.value,
          unitAltimeter: res.data.units.altimeter,
          unitAltitude: res.data.units.altitude,
          unitTemperature: res.data.units.temperature,
          unitVisibility: res.data.units.visibility,
          wind_speed: res.data.units.wind_speed,
          clouds: res.data.clouds
        });
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(`https://avwx.rest/api/station/${this.state.metar1}`)

      .then(res => {
        this.setState({
          nameAirport: res.data.name,
          iata: res.data.iata,
          icao: res.data.icao,
          runways: res.data.runways,
          lat: res.data.latitude,
          long: res.data.longitude,
          zoom: 13
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSat = () => {
    this.setState({
      mapUrl:
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    });
  };

  handleOrtho = () => {
    this.setState({
      mapUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let cloudList = this.state.clouds.map(
      cloud => cloud.type + cloud.altitude + " "
    );

    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/sign-in" />;
    return (
      <div className="container">
        <Time />
        <div
          class="jumbotron"
          style={{
            backgroundColor: "#fff",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19",
            marginTop: "1rem"
          }}
        >
          <div className="row">
            <div className="col-lg-3">
              <div className="card text-white  bg-dark mb-3">
                <div className="card-header">Requesting Metar</div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label>Airport Code (ICAO)</label>
                      <input
                        maxLength="4"
                        minLength="4"
                        required
                        type="text"
                        className="form-control"
                        placeholder="ICAO"
                        name="metar1"
                        onChange={this.handleChange}
                        style={{
                          position: "center",
                          maxWidth: "5rem",
                          textTransform: "uppercase"
                        }}
                      />
                    </div>
                  </form>
                  <div className="alert alert-secondary" role="alert">
                    {this.state.raw}
                  </div>
                  <div className="card-footer ">
                    {this.state.nameAirport} - {this.state.iata}/
                    {this.state.icao}- Runway: {this.state.runways.length}
                    <hr className="my-4" />
                    Temperature: {this.state.temperature}
                    {this.state.unitTemperature} <br />
                    Dewpoint: {this.state.dewpoint}
                    {this.state.unitTemperature} <br />
                    Pressure: {this.state.pressure}
                    {this.state.unitAltimeter}
                    <br />
                    Winds: {this.state.windDir}/{this.state.windSpd}
                    {this.state.wind_speed}
                    <br />
                    Visibility: {this.state.visibility}
                    {this.state.unitVisibility}
                    <br />
                    Clouds: {cloudList}
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <MapLeaflet
                mapUrl={this.state.mapUrl}
                zoom={this.state.zoom}
                lat={this.state.lat}
                long={this.state.long}
                style={{ paddingTop: "1rem" }}
              />
              <button
                onClick={this.handleSat}
                className="btn btn-info"
                style={{ marginTop: ".2rem" }}
              >
                Satellite
              </button>
              <button
                onClick={this.handleOrtho}
                className="btn btn-info"
                style={{ marginTop: ".2rem", marginLeft: ".2rem" }}
              >
                Road Map
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    logbooks: state.firestore.ordered.logbooks
  };
};

export default connect(mapStateToProps)(RequestMetar);
