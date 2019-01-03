import { Form, Input, Tooltip, Icon, Button, Card } from "antd";
import React from "react";
import StylistRegistrationForm from "./stylistRegistrationForm";
import axios from "axios";

const Search = Input.Search;
const FormItem = Form.Item;
const { Meta } = Card;

class StylistProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      data: this.props.location.data
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("user id profile " + this.state.data);
    if (this.state.data != null) {
      fetch("http://localhost:3000/api/stylist/" + this.state.data)
        .then(res => res.json())
        .then(json => {
          this.setState(
            {
              isLoaded: true,
              items: [json.stylist]
            },
            () => {
              console.log("Hi " + json);
            }
          );
        });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state.data + " and items user name " + this.state.items.userName);
    axios
      .put(
        "http://localhost:3000/api/stylist/" + this.state.data,
        this.state.items
      )
      .then(response => {
        console.log(response);
      });
  };

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
              <Form key={item.styId} onSubmit={this.handleSubmit}>
                <div className="form-group row">
                  <label>
                    <b>User Name : </b>{" "}
                  </label>
                  <label>&nbsp; {item.userName}</label>
                </div>
                <div className="form-group row">
                  <label>
                    <b>Email address : </b>{" "}
                  </label>
                  <label>&nbsp; {item.email}</label>
                </div>
                <div className="form-group row">
                  <label>
                    <b>charges Rate : </b>
                  </label>
                  <label>&nbsp; {item.chargesMan}</label>
                </div>
                <div className="form-group row">
                  <label>
                    <b>Acceptance : </b>
                  </label>
                  <label>&nbsp; {item.acceptance}</label>
                </div>
              </Form>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const WrappedStylistHome = Form.create()(StylistProfile);
export default WrappedStylistHome;
