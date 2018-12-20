import React, { Component } from 'react';

class StylistForm extends Component {
    state = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: ""
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({
            userName: "",
            email: "",
            password: "",
            confirmpassword: ""
        })
    };

    render() {
        return (
            <form>
                <h2>Stylist Registration Form</h2>
                <div className="form-group row">
                    <label className="col-5 col-md-4">User Name</label>
                    <input type="text" className="form-control col-6 col-md-4" id="usernameStylist" placeholder="Enter user name" />
                </div>
                <div className="form-group">
                    <label className="col-5 col-md-4">Email address</label>
                    <input type="email" className="form-control col-6 col-md-4" id="emailStylist" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle col-5 col-md-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Experience
                    </button>
                    <div className="dropdown-menu col-6 col-md-4" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item" >1 year or less than 1 year</button>
                        <button className="dropdown-item" >2 years or less than 2 years</button >
                        <button className="dropdown-item" >3 years or less than 3 years</button >
                        <button className="dropdown-item">more than 4 years</button >
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-5 col-md-4">Password</label>
                    <input type="password" className="form-control col-6 col-md-4" id="stylistPassword" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label className="col-5 col-md-4">Confirm Password</label>
                    <input type="password" className="form-control col-6 col-md-4" id="stylistconfirmPassword" placeholder="Confirm Password" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        );
    }
}

export default StylistForm;