import {
    Form, Input, Tooltip, Icon, Button
} from 'antd';
import React from 'react';
import StylistRegistrationForm from './stylistRegistrationForm';
import axios from 'axios';

const Search = Input.Search;
const FormItem = Form.Item;


class StylistProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            data: this.props.location.data
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log('user id profile ' + this.state.data);
        if (this.state.data != null) {
            fetch('http://localhost:3000/api/stylist/' + this.state.data)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        isLoaded: true,
                        items: [json.stylist]
                    }, () => {
                        console.log('Hi ' + json);
                    })
                });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state.data + " and items user name " + this.state.items.userName);
        axios.put('http://localhost:3000/api/stylist/' + this.state.data, this.state.items).then(response => {
            console.log(response);
        })
    }

    // handleChange(event) {
    //     this.setState({ userName: event.target.value });
    //     console.log("handle change " + this.state.userName);
    //     // this.setState({})
    // }

    render() {
        var { isLoaded, items } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <h2> Your Profile</h2>
                {items.map(item => (
                    <Form key={item.styId} onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label className="col-5 col-md-4">User Name</label>
                            <input type="text" className="form-control col-6 col-md-4" defaultValue={item.userName}></input>
                        </div>
                        <div className="form-group row">
                            <label className="col-5 col-md-4">Email address</label>
                            <input type="email" className="form-control col-6 col-md-4" defaultValue={item.email}></input>
                        </div>
                        <div className="form-group row">
                            <label className="col-5 col-md-4">charges Rate</label>
                            <input type="text" className="form-control col-6 col-md-4" defaultValue={item.chargesMan}></input>
                        </div>
                        {/* <button type="submit" className="btn btn-primary">Update</button> */}
                    </Form>
                ))}
            </div>
        );

    }
}

const WrappedStylistHome = Form.create()(StylistProfile);
export default WrappedStylistHome;