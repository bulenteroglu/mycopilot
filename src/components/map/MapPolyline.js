import React from "react";
import { Map, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "./map.css";
import { connect } from "react-redux";
import airportLists from "../../assets/API/airportList.json";

class MapPolyline extends React.Component {
  state = {
    lat: 51.505,
    long: -0.09,
    zoom: 2
  };

  render() {
    const position = [this.state.lat, this.state.long];
    const polyline = [[51.505, -0.09], [37.773972, -122.43129]];

    const { logbooks, auth } = this.props;

    return (
      <Map className="map container" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />

        <Polyline color="purple" positions={polyline} />
      </Map>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    logbooks: state.firestore.ordered.logbooks
  };
};

export default connect(mapStateToProps)(MapPolyline);
