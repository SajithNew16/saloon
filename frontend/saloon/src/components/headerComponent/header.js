import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import saloonImg from './saloon.PNG';

class Header extends Component {

    render() {
        let path = this.props.location.pathname;
        let loginFormActive, homeActive, aboutUsActive, contactUsActive = '';

        if (path === '/loginForm') {
            loginFormActive = ' active';
        } else if (path === '/') {
            homeActive = ' active';
        } else if (path === '/aboutus') {
            aboutUsActive = ' active';
        } else if (path === '/contactUs') {
            contactUsActive = ' active';
        }

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <img src={saloonImg} alt="Comcast" width="40px" height="40px" />
                    <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbarCollapse" styles="">
                        <ul className="navbar-nav mr-auto">
                            <li className={`nav-item ${homeActive}`}>
                                <NavLink className="nav-link" to="/" ><b>Home</b><span className="sr-only">(current)</span></NavLink>
                            </li>
                            <li className={`nav-item ${aboutUsActive}`}>
                                <NavLink className="nav-link" to="/aboutus"><span><b>About Us</b></span></NavLink>
                            </li>
                            <li className={`nav-item ${contactUsActive}`}>
                                <NavLink className="nav-link" to="/contactUs"><b>Contact Us</b></NavLink>
                            </li>
                            <li className="nav-item">
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <b>Sign Up</b>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <NavLink className="dropdown-item " to="/stylistForm">Stylist</NavLink>
                                        <NavLink className="dropdown-item " to="/saloonForm">Saloon Owner</NavLink>
                                    </div>
                                </div>
                            </li>
                            <li className={`nav-item ${loginFormActive}`}>
                                <NavLink className="nav-link" to="/loginForm"><b>Log In</b></NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default withRouter(Header);
