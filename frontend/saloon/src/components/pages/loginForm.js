import {
  Form, Icon, Input, Button
} from 'antd';
import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('http://localhost:3000/api/login', values).then(response => {
          console.log("Successful?: " + response.data.saloon);
          // if (response.data.success) {
          //   $('#clearButton').trigger("click");

          // } else {
          //   alert("Email has already existing! So you should have an account in Comcast. If you have any queries please post it on our contact us page");
          //   console.log(response.data.error)
          // }
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h2>Log In</h2>
        <Form.Item  {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('userEmail', {
            rules: [{ type: 'email', required: true, message: 'Please input your Email!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout}
          label="Password">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
            </Button>
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="/">Forgot password </a>
          Or register <a href="/stylistForm"> stylist </a>/ <a href="/saloonForm"> saloon owner </a>now!
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button id="clearButton" hidden onClick={e => {
            this.props.form.resetFields()
          }} >Clear</Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);
export default WrappedNormalLoginForm;
