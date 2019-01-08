import {
  Form,
  Card,
  Col,
  Row,
  InputNumber,
  Button,
  Input,
  Tabs,
  Tooltip,
  Icon,
  DatePicker
} from "antd";
import React from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import "../../../src/formcenter.css";

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
      startValue: null,
      endValue: null,
      endOpen: false,
      chargesMan: {},
      styId: "",
      data: this.props.location.data
    };
  }

  componentWillMount() {
    if (localStorage.getItem("myData") != "data") {
      window.location.href = "/loginForm";
    }
  }

  componentDidMount() {
    var today = moment().format("YYYY-MM-DD HH:mm:ss");
    this.setState.startValue = today;

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
  }

  disabledStartDate = startValue => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onStartChange = value => {
    this.onChange("startValue", value);
  };

  onEndChange = value => {
    this.onChange("endValue", value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var retVal = window.confirm(
          "Are you sure you want to update your user profile?"
        );
        if (retVal === true) {
          axios
            .put(
              "http://localhost:3000/api/stylistUserUpdate/" +
                this.state.userId,
              values
            )
            .then(res => {
              if (res.data.success) {
                alert("Successfully Updated!");
                return true;
              } else {
                alert(
                  "Email has already existing! So you should have an account in Comcast. If you have any queries please post it on our contact us page!"
                );
                return false;
              }
            });
        } else {
          return false;
        }
      }
    });
  };

  handleFreeSlotSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //get styId by UserId
        axios
          .get(
            "http://localhost:3000/api/stylistIdByUserId/" + this.state.userId
          )
          .then(res => {
            var styId = res.data.styId;
            values.styId = styId;
            //insert to styJob
            axios
              .post("http://localhost:3000/api/styJob/:styId", values)
              .then(res => {
                if (res.data.success) {
                  $("#clearButton").trigger("click");
                  alert("Successfully added free time slots");
                } else {
                  console.log("fail");
                }
              });
          });
      }
    });
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
    const { startValue, endValue, endOpen } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 10 }
      },
      wrapperCol: {
        xs: { span: 25 },
        sm: { span: 10 }
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
          <div className="divCenter">
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img alt="example" src={require("../../images/stylist.jpg")} />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </div>
          {items.map(item => (
            <Form key={item.styId} onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label={
                  <span>
                    User Name
                    <Tooltip title="What do you want others to call you?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator("userName", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your User Name!",
                      whitespace: true
                    }
                  ],
                  initialValue: item.userName
                })(<Input />)}
              </FormItem>

              <FormItem {...formItemLayout} label="E-mail">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!"
                    }
                  ],
                  initialValue: item.email
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="charges Rate">
                {getFieldDecorator("chargesMan", {
                  rules: [
                    {
                      type: "number",
                      min: 0,
                      message: "The input is not valid charges rate"
                    },
                    {
                      required: true,
                      message: "Please input your Charges"
                    }
                  ],
                  initialValue: item.chargesMan
                })(<InputNumber />)}
              </FormItem>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </Form>
          ))}
        </TabPane>
        <TabPane tab="Free Time Slot" key="2">
          <Form onSubmit={this.handleFreeSlotSubmit}>
            <FormItem {...formItemLayout} label="Free Time Slot From">
              {getFieldDecorator("startValue", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Starting free time"
                  }
                ]
              })(
                <DatePicker
                  disabledDate={current => {
                    return (
                      moment().add(-1, "days") >= current &&
                      this.disabledStartDate
                    );
                  }}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Start"
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Free Time Slot To">
              {getFieldDecorator("endValue", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Ending free time"
                  }
                ]
              })(
                <DatePicker
                  disabledDate={this.disabledEndDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="End"
                  onChange={this.onEndChange}
                  open={endOpen}
                  onOpenChange={this.handleEndOpenChange}
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("styId", {
                rules: [{ whitespace: true }]
              })(<Input hidden />)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Publish
              </Button>
            </FormItem>
            <Form.Item {...tailFormItemLayout}>
              <Button
                id="clearButton"
                hidden
                onClick={e => {
                  this.props.form.resetFields();
                }}
              >
                Clear
              </Button>
            </Form.Item>
          </Form>
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
