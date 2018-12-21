import React, { Component } from 'react';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

class StylistForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            email: null,
            experience: null,
            password: null,
            confirmPassword: null,
            formErrors: {
                userName: "",
                email: "",
                experience: "",
                password: "",
                confirmPassword: ""
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)) {
            console.log(`${this.state.userName}  ${this.state.email}  ${this.state.experience} ${this.state.password}  ${this.state.confirmPassword}`);
        } else {
            console.log('invalid ');
        }
    };

    handlechange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        // console.log("Name: ", name);
        // console.log("value: ", value);
        switch (name) {
            case "userName":
                formErrors.userName = value.length < 3 && value.length > 0 ? "minimum 3 characters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value) && value.length > 0 ? "Invalid email" : "";
                break;
            case "password":
                formErrors.password = value.length < 6 && value.length > 0 ? "minimum 6 characters required" : "";
                break;
            case "experience":
                formErrors.experience = value.length < 3 && value.length > 0 ? "minimum 3 characters required" : "";
                break;
            case "confirmPassword":
                formErrors.confirmPassword = value.length < 6 && value.length > 0 ? 'minimum 6 characters required' : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };


    render() {
        const { formErrors } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit} noValidate>
                    <h2>Stylist Registration Form</h2>
                    <div className="form-group row">
                        <label htmlForm="userName" className="control-label col-5 col-md-4">User Name</label>
                        <input type="text" className="form-control col-6 col-md-4" onChange={this.handlechange} id="usernameStylist" placeholder="Enter user name" noValidate />
                    </div>
                    {formErrors.userName.length > 0 && (
                        <span className="errormessage">{formErrors.userName}</span>
                    )}
                    <div className="form-group row">
                        <label className="control-label col-5 col-md-4">Email Address</label>
                        <input type="email" className="form-control col-6 col-md-4" onChange={this.handlechange} placeholder="Enter email address" noValidate />
                    </div>
                    {formErrors.email.length > 0 && (
                        <span className="errormessage">{formErrors.email}</span>
                    )}
                    <div className="form-group row">
                        <label className="control-label col-5 col-md-4">Experience</label>
                        <select className="form-control col-6 col-md-4 browser-default custom-select" onChange={this.handlechange} noValidate>
                            <option value>Select years of experience</option>
                            <option value="1">1 year or less than 1 year</option>
                            <option value="2">2 years or less than 2 years</option>
                            <option value="3">3 years or less than 3 years</option>
                            <option value="4">more than 4 years</option>
                        </select>
                    </div>
                    {formErrors.experience.length > 0 && (
                        <span className="errormessage">{formErrors.experience}</span>
                    )}
                    <div className="form-group row">
                        <label className="control-label col-5 col-md-4">Password</label>
                        <input type="password" className="form-control col-6 col-md-4" onChange={this.handlechange} placeholder="Password" />
                    </div>
                    {formErrors.password.length > 0 && (
                        <span className="errormessage">{formErrors.password}</span>
                    )}
                    <div className="form-group row">
                        <label className="control-label col-5 col-md-4">Confirm Password</label>
                        <input type="password" className="form-control col-6 col-md-4" onChange={this.handlechange} placeholder="Confirm password" />
                    </div>
                    {formErrors.confirmPassword.length > 0 && (
                        <span className="errormessage">{formErrors.password}</span>
                    )}
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
                <h5>Already have an account? <a href="/">Log In</a></h5>
            </div>
        );
    }
}
export default StylistForm;