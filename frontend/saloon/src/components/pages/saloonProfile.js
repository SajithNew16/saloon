import {
    Form, Input, Tooltip, Icon, Button
} from 'antd';
import React from 'react';
import StylistRegistrationForm from './stylistRegistrationForm';
import axios from 'axios';

const Search = Input.Search;
const FormItem = Form.Item;


class SaloonProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            data: this.props.location.data
        }
    }

    componentDidMount() {
        console.log('user id profile ' + this.state.data);
        if (this.state.data != null) {
            fetch('http://localhost:3000/api/saloon/' + this.state.data)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        isLoaded: true,
                        items: [json.saloon]
                    }, () => {
                        console.log('Hi ' + json.saloon);
                    })
                });
        }
    }

    render() {
        var { isLoaded, items } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <h2>Your Profile</h2>
                {items.map(item => (
                    <Form key={item.styId} onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label className="col-5 col-md-4">User Name</label>
                            <input type="text" className="form-control col-6 col-md-4" defaultValue={item.userName}></input>
                        </div>
                        <div className="form-group row">
                            <label className="col-5 col-md-4">Saloon Name</label>
                            <input type="text" className="form-control col-6 col-md-4" defaultValue={item.saloonName}></input>
                        </div>
                        <div className="form-group row">
                            <label className="col-5 col-md-4">Location</label>
                            <input type="text" className="form-control col-6 col-md-4" defaultValue={item.location}></input>
                        </div>
                        <div className="form-group row">
                            <label className="col-5 col-md-4">Email address</label>
                            <input type="email" className="form-control col-6 col-md-4" defaultValue={item.email}></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </Form>
                ))}
            </div>
        );

    }
}

const WrappedStylistHome = Form.create()(SaloonProfile);
export default WrappedStylistHome;