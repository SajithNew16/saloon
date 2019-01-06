import { Form, Card, Col, Row, InputNumber, Button, Input, Tabs } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { Meta } = Card;

class StylistHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      confirmDirty: false,
      autoCompleteResult: [],
      userName: "",
      email: "",
      experience: [],
      password: "",
      type: "",
      userId: "",
      data: this.props.location.data
    };
  }

  componentWillMount() {
    if (localStorage.getItem("myData") != "data") {
      window.location.href = "/loginForm";
    }
  }

  componentDidMount() {
    console.log("user id profile " + this.state.data);
    if (this.state.data != null) {
      fetch("http://localhost:3000/api/stylistUser/" + this.state.data)
        .then(res => res.json())
        .then(json => {
          this.setState(
            {
              isLoaded: true,
              items: json.stylist
            },
            () => {
              console.log("Hi " + this.state.items);
            }
          );
        });
    }
    // get user id by email
    if (this.state.data != null) {
      axios
        .get("http://localhost:3000/api/user/" + this.state.data)
        .then(res => {
          this.setState(
            {
              userId: JSON.stringify(res.data.userId)
            },
            () => {
              console.log("uid " + this.state.userId);
            }
          );
        });
    }

    // console.log("user id " + this.state.userId);
  }

  handleSubmit = e => {
    e.preventDefault();

    console.log("us " + this.state.items);
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  updateStylist = () => {
    console.log("Received values of form: ");
  };

  callback(key) {
    console.log(key);
  }
  render() {
    var { isLoaded, items } = this.state;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    function onChange(value) {
      console.log("changed", value);
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <Tabs defaultActiveKey="1" onChange={() => this.callback}>
        <TabPane tab=" Profile" key="1">
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
                    <label className="col-5 col-md-4">
                      <b>User Name :</b>
                    </label>
                    <input
                      type="text"
                      className="form-control col-6 col-md-4"
                      defaultValue={item.userName}
                      onSubmit={e =>
                        this.setState({ userName: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group row">
                    <label className="col-5 col-md-4">
                      <b>Email address :</b>
                    </label>
                    <input
                      type="email"
                      className="form-control col-6 col-md-4"
                      defaultValue={item.email}
                    />
                  </div>

                  <div className="form-group row">
                    <label className="col-5 col-md-4">
                      <b>charges Rate :</b>
                    </label>
                    <input
                      type="number"
                      className="form-control col-6 col-md-4"
                      defaultValue={item.chargesMan}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                  {/* <div className="form-group row">
                    <label>
                      <b>Acceptance : </b>
                    </label>
                    <label>&nbsp; {item.acceptance}</label>
                  </div> */}
                </Form>
              ))}
            </div>
          </div>
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    );
  }
}

const WrappedStylistHome = Form.create()(StylistHomePage);
export default WrappedStylistHome;
