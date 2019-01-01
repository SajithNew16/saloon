import { Form, Input, Tooltip, Icon, Button, Card } from "antd";
import React from "react";
import StylistRegistrationForm from "./stylistRegistrationForm";
import axios from "axios";

const Search = Input.Search;
const FormItem = Form.Item;
const { Meta } = Card;

class SaloonProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      data: this.props.location.data
    };
  }

  componentDidMount() {
    console.log("user id profile " + this.state.data);
    if (this.state.data != null) {
      fetch("http://localhost:3000/api/saloon/" + this.state.data)
        .then(res => res.json())
        .then(json => {
          this.setState(
            {
              isLoaded: true,
              items: [json.saloon]
            },
            () => {
              console.log("Hi " + json.saloon);
            }
          );
        });
    }
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container">
        <h2> Your Profile</h2>
        <div className="row">
          <div className="col-sm">
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="stylist.jpg" />}
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </div>
          <div className="col-sm">
            {items.map(item => (
              <Form key={item.salId} onSubmit={this.handleSubmit}>
                <div className="form-group row">
                  <label>
                    <b>User Name : </b>{" "}
                  </label>
                  <label>&nbsp; {item.userName}</label>
                </div>
                <div className="form-group row">
                  <label>
                    <b>Saloon Name : </b>{" "}
                  </label>
                  <label>&nbsp; {item.saloonName}</label>
                </div>
                <div className="form-group row">
                  <label>
                    <b>Location : </b>
                  </label>
                  <label>&nbsp; {item.location}</label>
                </div>
                <div className="form-group row">
                  <label>
                    <b>Email address : </b>
                  </label>
                  <label>&nbsp; item.email</label>
                </div>
              </Form>
            ))}
          </div>
        </div>
      </div>
    );
    //     <div>
    //         <h2>Your Profile</h2>
    //         {items.map(item => (
    //             <Form key={item.salId} onSubmit={this.handleSubmit}>
    //                 <div className="form-group row">
    //                     <label className="col-5 col-md-4">User Name</label>
    //                     <input type="text" className="form-control col-6 col-md-4" defaultValue={item.userName}></input>
    //                 </div>
    //                 <div className="form-group row">
    //                     <label className="col-5 col-md-4">Saloon Name</label>
    //                     <input type="text" className="form-control col-6 col-md-4" defaultValue={item.saloonName}></input>
    //                 </div>
    //                 <div className="form-group row">
    //                     <label className="col-5 col-md-4">Location</label>
    //                     <input type="text" className="form-control col-6 col-md-4" defaultValue={item.location}></input>
    //                 </div>
    //                 <div className="form-group row">
    //                     <label className="col-5 col-md-4">Email address</label>
    //                     <input type="email" className="form-control col-6 col-md-4" defaultValue={item.email}></input>
    //                 </div>
    //                 <button type="submit" className="btn btn-primary">Update</button>
    //             </Form>
    //         ))}
    //     </div>
    // );
  }
}

const WrappedStylistHome = Form.create()(SaloonProfile);
export default WrappedStylistHome;
