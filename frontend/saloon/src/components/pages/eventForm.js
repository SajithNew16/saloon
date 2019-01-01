import { DatePicker } from "antd";
import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import $ from "jquery";
import moment from "moment";

const { TextArea } = Input;
const FormItem = Form.Item;

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      data: this.props.location.data
    };
  }

  componentDidMount() {
    var today = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log("today " + today);
  }

  disabledStartDate = startValue => {
    const endValue = this.state.endValue;
    var today = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log("today " + today);
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios
          .put("http://localhost:3000/api/stylist/" + this.state.data, values)
          .then(response => {
            console.log("Successful" + response);
            if (response.data === 1) {
              $("#clearButton").trigger("click");
              var retVal = window.confirm(
                "Successfully registered! Do you want to continue?"
              );
              if (retVal === true) {
                $("#nextPage").trigger("click");
                // window.location.href = "http://localhost:3001/stylistHome";
                return true;
              } else {
                return false;
              }
            } else {
              alert("Wrong ");
              console.log(response.data.error);
            }
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 14 },
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
    const { startValue, endValue, endOpen } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>Add your free time slots</h2>
        <FormItem {...formItemLayout} label="Start Date">
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
        <FormItem {...formItemLayout} label="End Date">
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
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Publish
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedStylistHome = Form.create()(EventForm);
export default WrappedStylistHome;
