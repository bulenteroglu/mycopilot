import React from "react";
import plane1 from "../../assets/plane1.jpg";
import plane2 from "../../assets/plane2.jpg";
import plane3 from "../../assets/plane3.jpg";

const Carousel = props => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          className="active"
        />
        <li data-target="#carouselExampleIndicators" data-slide-to="1" />
        <li data-target="#carouselExampleIndicators" data-slide-to="2" />
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={plane1} alt="First slide" />
          <div className="carousel-caption  d-md-block">
            <h5>Total Hours</h5>
            <p>{props.totalhour}</p>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={plane2} alt="Second slide" />
          <div className="carousel-caption  d-md-block">
            <h5>Last Flight</h5>
            <p>
              {props.depicao} > {props.arricao}
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={plane3} alt="Third slide" />
          <div className="carousel-caption  d-md-block">
            <h5>Total Flights</h5>
            <p>{props.totalflights}</p>
          </div>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carousel;
