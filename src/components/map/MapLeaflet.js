import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./map.css";
import test from "../../assets/marker.png";

class MapLeaflet extends React.Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 8
  };

  render() {
    const position = [this.props.lat, this.props.long];
    return (
      <Map className="map" center={position} zoom={this.props.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={this.props.mapUrl}
        />

        <Marker position={position} />
      </Map>
    );
  }
}

export default MapLeaflet;
