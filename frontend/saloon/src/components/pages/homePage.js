import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Homepage extends Component {
  render() {
    return (
      <div className="container-fluid">
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
              <img
                className="d-block w-100"
                src="saloon2.jpg"
                height="100%"
                width="100%"
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="saloon3.jpg"
                height="100%"
                width="100%"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="saloon1.jpg"
                height="100%"
                width="100%"
                alt="Third slide"
              />
            </div>
            <NavLink
              className="carousel-control-prev"
              to="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </NavLink>
            <NavLink
              className="carousel-control-next"
              to="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
