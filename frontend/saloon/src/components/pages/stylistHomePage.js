import { Form, Card, Col, Row, InputNumber, Button, Input } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const FormItem = Form.Item;

class StylistHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
              console.log(this.state.userId);
            }
          );
        });
    }

    console.log("user id " + this.state.userId);
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("us ");
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

  render() {
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
    return (
      <div>
        <div style={{ background: "#ECECEC", padding: "30px" }}>
          <h2>Welcome Stylist</h2>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Your Profile" bordered={false}>
                <NavLink
                  to={{ pathname: "/stylistProf", data: this.state.userId }}
                >
                  View Your Profile
                </NavLink>
              </Card>
            </Col>
            {/* <Col span={8}>
                            <Card title="Notifications" bordered={false}>Card content</Card>
                        </Col> */}
            <Col span={8}>
              <Card title="Event Calendar" bordered={false}>
                <NavLink to="/eventForm">Enter your new events</NavLink>
              </Card>
            </Col>
          </Row>
        </div>
        {/* <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <h3>Update Your Charges Rate {this.state.data}</h3>
                    <Row gutter={16}>
                        <Col span={8}>
                        <Form onSubmit={this.handleSubmit}>
                            <Card title="Per Man" bordered={false}>
                            <InputNumber
                                    defaultValue={0}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    id="perMan"
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    onChange={onChange}
                            />
                            <p />
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">Add</Button>
                            </FormItem>
                            </Card>
                        </Form>             
                        </Col>
                        <Col span={8}>
                        <Form onSubmit={this.handleSubmit}>
                            <Card title="Per Woman" bordered={false}>
                                <InputNumber
                                    defaultValue={0}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    onChange={onChange}
                                />
                                <p />
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">Add</Button>
                            </FormItem>
                            </Card>
                        </Form>  
                        </Col>
                        <Col span={8}>
                        <Form onSubmit={this.handleSubmit}>
                            <Card title="Per Kid" bordered={false}>
                                <InputNumber
                                    defaultValue={0}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    onChange={onChange}
                                />
                                <p />
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">Add</Button>
                            </FormItem>
                            </Card>
                        </Form>  
                        </Col>
                    </Row>
                  
                </div> */}
      </div>
    );
  }
}

const WrappedStylistHome = Form.create()(StylistHomePage);
export default WrappedStylistHome;
