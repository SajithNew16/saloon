import {
    Form, Input, Tooltip, Icon, Button
} from 'antd';
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
const { TextArea } = Input;

const FormItem = Form.Item;

class ContactUsPage extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post('http://localhost:3000/api/saloon', values).then(response => {
                    console.log("Successful" + response);
                    if (response.data.success) {
                        $('#clearButton').trigger("click");
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
                        console.log(response.data.error)
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
                <h2>Contact Us</h2>
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
                        rules: [{ message: 'Please input your User Name!', whitespace: true }],
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
                    label="Message"
                >
                    {getFieldDecorator('message', {
                        rules: [{ required: true, message: 'Please input your Message!', whitespace: true }],
                    })(
                        <TextArea />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Contact Us</Button>
                </FormItem>
                <Form.Item {...tailFormItemLayout}>
                    <Button id="clearButton" hidden onClick={e => {
                        this.props.form.resetFields()
                    }} >Clear</Button>
                </Form.Item>

            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(ContactUsPage);
export default WrappedRegistrationForm;