import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import "leaflet-arc";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import airportLists from "../../assets/API/airportList.json";
import markerlogo from "../../assets/marker.png";

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

var polyline;
var marker;
var markerarr;
var counter = 0;

var deplat = new Array();
var deplong = new Array();
var arrlat = new Array();
var arrlong = new Array();

var arrname = new Array();
var depname = new Array();

var greenIcon = L.icon({
  iconUrl: markerlogo,

  iconSize: [15, 15], // size of the icon
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

class ShowMap extends React.Component {
  state = {
    refresh: null
  };

  componentDidMount() {
    this.map = L.map("map", {
      center: [50, 0],
      zoom: 4,
      zoomControl: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      detectRetina: true,
      maxZoom: 20,
      maxNativeZoom: 17
    }).addTo(this.map);

    for (let i = 0; i < counter; i++) {
      marker = L.marker([deplat[i], deplong[i]], {
        icon: greenIcon,
        title: depname[i]
      }).addTo(this.map);

      markerarr = L.marker([arrlat[i], arrlong[i]], {
        icon: greenIcon,
        title: arrname[i]
      }).addTo(this.map);

      polyline = L.Polyline.Arc(
        [deplat[i], deplong[i]],
        [arrlat[i], arrlong[i]],
        {
          color: "orange",
          vertices: 500
        }
      ).addTo(this.map);

      this.map.invalidateSize();

      this.map.addLayer(polyline);
      this.map.addLayer(marker);
    }
  }

  render() {
    const { auth, logbooks } = this.props;

    logbooks.map(logbook => {
      if (logbook.logbookId === auth.uid) {
        {
          airportLists.map(airportList => {
            if (airportList.airportCode === logbook.depicao) {
              depname.push(
                airportList.airportCode +
                  " " +
                  "(" +
                  airportList.cityName +
                  " " +
                  airportList.airportName +
                  ")"
              );
              deplat.push(airportList.latitude);
              deplong.push(airportList.longitude);
              counter += 1;
            }
          });
        }
        {
          airportLists.map(airportList => {
            if (airportList.airportCode === logbook.arricao) {
              arrname.push(
                airportList.airportCode +
                  " " +
                  "(" +
                  airportList.cityName +
                  " " +
                  airportList.airportName +
                  ")"
              );
              arrlat.push(airportList.latitude);
              arrlong.push(airportList.longitude);
            }
          });
        }
      } else {
        return null;
      }
    });

    return (
      <div>
        <Wrapper className="container" width="100%" height="500px" id="map" />
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

export default connect(mapStateToProps)(ShowMap);
