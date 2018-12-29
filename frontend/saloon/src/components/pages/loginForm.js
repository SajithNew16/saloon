import {
  Form, Icon, Input, Button
} from 'antd';
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      if (!err) {
        axios.post('http://localhost:3000/api/login', values).then(response => {
          if (response.data.user != null) {
            // console.log(response.data.user.type)
            if (response.data.user.type === "stylist") {
              $('#stylist').trigger("click");
            }
            else if (response.data.user.type === "saloon") {
              $('#saloon').trigger("click");
            }
          }
          else {
            alert('Your Email or Password is incorrect.');
          }
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
          {getFieldDecorator('email', {
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
          <Link to="/">Forgot password </Link>
          Or register <Link to="/stylistForm"> stylist </Link>/ <Link to="/saloonForm"> saloon owner </Link>now!
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Link to={{ pathname: "/stylistHome", data: this.state.email }}>
            <Button id="stylist" hidden type="primary" onClick={e => {
              this.props.form.resetFields();
            }}>Next page</Button>
          </Link>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Link to={{ pathname: "/saloonHome", data: this.state.email }}>
            <Button id="saloon" hidden type="primary" onClick={e => {
              this.props.form.resetFields();
            }}>Next page</Button>
          </Link>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);
export default WrappedNormalLoginForm;
