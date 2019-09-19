import React from "react";
import { connect } from "react-redux";
import { createLogbook } from "../../store/actions/logbookActions";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateLogbook extends React.Component {
  state = {
    date: null,
    depicao: "",
    deptime: "",
    arricao: "",
    arrtime: "",
    airtype: "",
    airreg: "",
    commandpilotname: "",
    totaltime: null,
    remarks: "",
    callsign: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createLogbook(this.state);
    this.props.history.push("/");
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleDateChange = date => {
    this.setState({
      date
    });
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/sign-in" />;
    return (
      <div className="container">
        <form
          className="card p-3 mb-5"
          style={{
            marginTop: "1rem",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19"
          }}
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Date</label>

            <br />
            <DatePicker
              required
              maxDate={new Date()}
              dateFormat="dd/MM/yy"
              className="form-control"
              selected={this.state.date}
              onChange={this.handleDateChange}
            />
          </div>

          <div className="form-row">
            <div className="col">
              <label htmlFor="">Callsign</label>
              <input
                maxLength="7"
                minLength="4"
                required
                type="text"
                className="form-control"
                name="callsign"
                placeholder="THY23PQ"
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <label htmlFor="">Departure Icao</label>
              <input
                maxLength="4"
                minLength="4"
                required
                type="text"
                className="form-control"
                name="depicao"
                placeholder="EGLL"
                onChange={this.handleChange}
              />
            </div>

            <div className="col">
              <label htmlFor="">Off Block Time</label>
              <input
                required
                type="time"
                className="form-control"
                name="deptime"
                placeholder="12:15"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col">
              <label htmlFor="">Arrival Icao</label>
              <input
                maxLength="4"
                minLength="4"
                required
                type="text"
                className="form-control"
                name="arricao"
                placeholder="LTFM"
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <label htmlFor="">On Block Time</label>
              <input
                required
                type="time"
                className="form-control"
                name="arrtime"
                placeholder="17:23"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col">
              <label htmlFor="">Aircraft Type</label>
              <input
                required
                type="text"
                className="form-control"
                name="airtype"
                placeholder="Make, Model and Variant"
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <label htmlFor="">Aircraft Registiration</label>
              <input
                required
                type="text"
                className="form-control"
                name="airreg"
                placeholder="TC-JJT"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Pilot in Command</label>
            <input
              required
              type="text"
              className="form-control"
              name="commandpilotname"
              placeholder="Hakan Turgut"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Total Time</label>
            <input
              required
              type="time"
              className="form-control"
              name="totaltime"
              placeholder="03:03"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Remarks</label>
            <input
              required
              type="text"
              className="form-control"
              name="remarks"
              placeholder="Windy, light chops..."
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Entry
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLogbook: logbook => dispatch(createLogbook(logbook))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLogbook);
