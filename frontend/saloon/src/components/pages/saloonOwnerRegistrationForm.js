import {
    Form, Input, Tooltip, Icon, Button
} from 'antd';
import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

const FormItem = Form.Item;

class SaloonOwnerRegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post('http://localhost:3000/api/user', values).then(response => {
                    if (response.data.success) {
                        $('#clearButton').trigger("click");
                        var email = values.email;
                        //get user id by email
                        axios.get('http://localhost:3000/api/user/' + email)
                            .then(res => {
                                var userId = JSON.stringify(res.data.userId);
                                // $('#userIdTxt').val(userId);
                                // console.log($('#userIdTxt').val());
                                // console.log(values.userId);
                                this.props.form.setFieldsValue({ location: userId });
                                console.log(values.location);
                                // this.props.forms.location = "fe";
                                // this.props.forms.userId = userId;
                                // console.log(values.userId);
                                //insert into saloon table
                                axios.post('http://localhost:3000/api/saloon', values).then(res => {
                                    if (res.data.success) {
                                        console.log("added");
                                    }
                                    else {
                                        console.log("not added " + res.data.err);
                                    }
                                })
                            })



                        var retVal = window.confirm("Successfully registered! Do you want to continue?");
                        if (retVal === true) {
                            window.location.href = "http://localhost:3001/saloonHome";
                            return true;
                        }
                        else {
                            return false;
                        }
                    } else {
                        alert("Email has already existing! So you should have an account in Comcast. If you have any queries please post it on our contact us page");
                    }
                })
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
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
                sm: { span: 14 },
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
            <Form onSubmit={this.handleSubmit}>
                <h2>Registration For Saloon Owner</h2>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            User Name&nbsp;
                <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your User Name!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Saloon Name"
                >
                    {getFieldDecorator('saloonName', {
                        rules: [{ required: true, message: 'Please input your Saloon Name!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Location"
                >
                    {getFieldDecorator('location', {
                        rules: [{ required: true, message: 'Please input your Saloon Location!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Confirm Password"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Sign Up</Button>
                    <center>Already have an account? <NavLink to="/loginForm">Log In</NavLink></center>
                </FormItem>
                <Form.Item {...tailFormItemLayout}>
                    <Button id="clearButton" hidden onClick={e => {
                        this.props.form.resetFields()
                    }} >Clear</Button>
                </Form.Item>
                <FormItem
                >
                    {getFieldDecorator('type', {
                        initialValue: "saloon",
                        rules: [{ whitespace: true }],
                    })(
                        <Input hidden />
                    )}
                </FormItem>
                <FormItem
                >
                    {getFieldDecorator('userId', {
                        rules: [{ whitespace: true }],
                    })(
                        <Input id="userIdTxt" />
                    )}
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(SaloonOwnerRegistrationForm);
export default WrappedRegistrationForm;