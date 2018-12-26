import {
    Form, Input, Tooltip, Icon, Button
} from 'antd';
import React from 'react';
import StylistRegistrationForm from './stylistRegistrationForm';

const FormItem = Form.Item;

class StylistHomePage extends  StylistRegistrationForm {
   
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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
                sm: { span: 16 },
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
            <h2>Welcome</h2>
            // <Form onSubmit={this.handleSubmit}>
            //     <h2>Welcome</h2>
            //     <FormItem
            //         {...formItemLayout}
            //         label={(
            //             <span>
            //                 User Name&nbsp;
            //     <Tooltip title="What do you want others to call you?">
            //                     <Icon type="question-circle-o" />
            //                 </Tooltip>
            //             </span>
            //         )}
            //     >
            //         {getFieldDecorator('userName', {
            //             rules: [{ required: true, message: 'Please input your User Name!', whitespace: true }],
            //         })(
            //             <Input />
            //         )}
            //     </FormItem>
            //     <FormItem
            //         {...formItemLayout}
            //         label="E-mail"
            //     >
            //         {getFieldDecorator('email', {
            //             rules: [{
            //                 type: 'email', message: 'The input is not valid E-mail!',
            //             }, {
            //                 required: true, message: 'Please input your E-mail!',
            //             }],
            //         })(
            //             <Input />
            //         )}
            //     </FormItem>
            //     <FormItem
            //         {...formItemLayout}
            //         label="Saloon Name"
            //     >
            //         {getFieldDecorator('saloonName', {
            //             rules: [{ required: true, message: 'Please input your Saloon Name!', whitespace: true }],
            //         })(
            //             <Input />
            //         )}
            //     </FormItem>
            //     <FormItem
            //         {...formItemLayout}
            //         label="Location"
            //     >
            //         {getFieldDecorator('Saloon Location', {
            //             rules: [{ required: true, message: 'Please input your Saloon Location!', whitespace: true }],
            //         })(
            //             <Input />
            //         )}
            //     </FormItem>
            //     <FormItem
            //         {...formItemLayout}
            //         label="Password"
            //     >
            //         {getFieldDecorator('password', {
            //             rules: [{
            //                 required: true, message: 'Please input your password!',
            //             }, {
            //                 validator: this.validateToNextPassword,
            //             }],
            //         })(
            //             <Input type="password" />
            //         )}
            //     </FormItem>
            //     <FormItem
            //         {...formItemLayout}
            //         label="Confirm Password"
            //     >
            //         {getFieldDecorator('confirm', {
            //             rules: [{
            //                 required: true, message: 'Please confirm your password!',
            //             }, {
            //                 validator: this.compareToFirstPassword,
            //             }],
            //         })(
            //             <Input type="password" onBlur={this.handleConfirmBlur} />
            //         )}
            //     </FormItem>
            //     <FormItem {...tailFormItemLayout}>
            //         <Button type="primary" htmlType="submit">Sign Up</Button>
            //         <center>Already have an account? <a href="/">Log In</a></center>
            //     </FormItem>
            // </Form>
        );
    }
}

const WrappedStylistHome = Form.create()(StylistHomePage);
export default WrappedStylistHome;