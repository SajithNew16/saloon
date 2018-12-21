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
            <div>
                <form>
                    <h2>Stylist Registration Form</h2>
                    <div className="form-group row">
                        <label className="col-5 col-md-4">User Name</label>
                        <input type="text" className="form-control col-6 col-md-4" id="usernameStylist" placeholder="Enter user name" />
                    </div>
                    <div className="form-group row">
                        <label className="col-5 col-md-4">Email Address</label>
                        <input type="email" className="form-control col-6 col-md-4" id="emailStylist" placeholder="Enter email address" />
                    </div>
                    <div className="form-group row">
                        <label className="col-5 col-md-4">Experience</label>
                        <select className="form-control col-6 col-md-4 browser-default custom-select">
                            <option value>Select years of experience</option>
                            <option value="1">1 year or less than 1 year</option>
                            <option value="2">2 years or less than 2 years</option>
                            <option value="3">3 years or less than 3 years</option>
                            <option value="4">more than 4 years</option>
                        </select>
                    </div>
                    <div className="form-group row">
                        <label className="col-5 col-md-4">Password</label>
                        <input type="password" className="form-control col-6 col-md-4" id="stylistPassword" placeholder="Password" />
                    </div>
                    <div className="form-group row">
                        <label className="col-5 col-md-4">Confirm Password</label>
                        <input type="password" className="form-control col-6 col-md-4" id="stylistconfirmPassword" placeholder="Confirm password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        );
    }
}
export default StylistForm;