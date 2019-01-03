import { Form, Input, Tooltip, Icon, Button, Cascader, DatePicker } from "antd";
import React from "react";
import axios from "axios";
import $ from "jquery";
import { Link } from "react-router-dom";
import moment from "moment";

const FormItem = Form.Item;
const experiences = [
  {
    value: "1 year or less than 1 year",
    label: "1 year or less than 1 year"
  },
  {
    value: "2 years or more than 1 year",
    label: "2 years or more than 1 year"
  },
  {
    value: "3 years or more than 2 years",
    label: "3 years or more than 2 years"
  },
  {
    value: "more than 3 years",
    label: "more than 3 years"
  }
];

class StylistRegistrationForm extends React.Component {
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
      startValue: null,
      endValue: null,
      endOpen: false
    };
  }

  componentDidMount() {
    var today = moment().format("YYYY-MM-DD HH:mm:ss");
    this.setState.startValue = today;
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post("http://localhost:3000/api/user", values).then(response => {
          if (response.data.success) {
            $("#clearButton").trigger("click");
            var email = values.email;
            //get user id by email
            axios.get("http://localhost:3000/api/user/" + email).then(res => {
              var userId = JSON.stringify(res.data.userId);
              values.userId = userId;
              //insert into stylist table
              axios
                .post("http://localhost:3000/api/stylist", values)
                .then(res => {
                  if (res.data.success) {
                    console.log("added to stylist table");
                    var retVal = window.confirm(
                      "Successfully registered! Do you want to continue?"
                    );
                    if (retVal === true) {
                      localStorage.setItem("myData", "data");
                      $("#nextPage").trigger("click");
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    console.log("not added because " + res.data.err);
                  }
                });
            });
          } else {
            alert(
              "Email has already existing! So you should have an account in Comcast. If you have any queries please post it on our contact us page"
            );
          }
        });
      }
    });
  };

  disabledStartDate = startValue => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const startValue = this.state.startValue;
    var today = moment().format("YYYY-MM-DD HH:mm:ss");

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

  handleClearForm = e => {
    this.props.form.resetFields();
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { startValue, endValue, endOpen } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 16 },
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

    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>Registration For Stylist</h2>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              User Name&nbsp;
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
            ]
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
            ]
          })(
            <Input onChange={e => this.setState({ email: e.target.value })} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Working Experience">
          {getFieldDecorator("experience", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your working experience as a stylist!"
              }
            ]
          })(<Cascader options={experiences} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Charges Rate Per hour">
          {getFieldDecorator("chargesMan", {
            rules: [
              {
                required: true,
                message: "Please input your Charges Rate!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input type="number" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Free Slot From">
          {getFieldDecorator("startValue", {
            rules: [
              {
                required: true,
                message: "Please input your Starting free time"
              }
            ]
          })(
            <DatePicker
              disabledDate={this.disabledStartDate}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Start"
              onChange={this.onStartChange}
              onOpenChange={this.handleStartOpenChange}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Free Slot To">
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
        <FormItem {...formItemLayout} label="Password">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input type="password" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Confirm Password">
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
          <center>
            Already have an account? <Link to="/loginForm">Log In</Link>
          </center>
        </Form.Item>
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
          <Link to={{ pathname: "/stylistHome", data: this.state.email }}>
            <Button id="nextPage" hidden type="primary">
              Next page
            </Button>
          </Link>
        </Form.Item>
        <FormItem>
          {getFieldDecorator("type", {
            initialValue: "stylist",
            rules: [{ whitespace: true }]
          })(<Input hidden />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("acceptance", {
            initialValue: "intial",
            rules: [{ whitespace: true }]
          })(<Input hidden />)}
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(StylistRegistrationForm);
export default WrappedRegistrationForm;
