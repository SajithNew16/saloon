import {
    Form, Input, Tooltip, Icon, Button, Cascader
} from 'antd';
import React from 'react';
import axios from 'axios';

const FormItem = Form.Item;
const experiences = [{
    value: '1 year or less than 1 year',
    label: '1 year or less than 1 year'
}, {
    value: '2 years or more than 1 year',
    label: '2 years or more than 1 year'
}, {
    value: '3 years or more than 2 years',
    label: '3 years or more than 2 years'
},
{
    value: 'more than 3 years',
    label: 'more than 3 years'
}
];


class StylistRegistrationForm extends React.Component {

    constructor() {
        super();
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            userName: '',
            email: '',
            experience: [],
            password: ''
        }
    }

    // state = {
    //     confirmDirty: false,
    //     autoCompleteResult: [],
    //     userName: '',
    //     email: '',
    //     experience: [],
    //     password: ''
    // };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post('http://localhost:3000/api/stylists', values).then(response => {
                    // response.json().then(data => {
                        
                    // })
                    console.log("Successful" + response);
                        if(response.data.success){
                            console.log(response.data.stylist)
                        }else{
                            console.log(response.data.error)
                        }
                    

                }).catch(err => { console.error('Err', err) })
                // console.log('Received values of form: ', values);
                // document.getElementById("create-course-form").reset();
                this.handleClearForm();


                // var retVal = window.confirm("Successfully registered! Do you want to continue?");
                // if (retVal === true) {
                //     window.location.href = "http://localhost:3001/stylistHome";
                //     return true;
                // }
                // else {
                //     return false;
                // }

            }
        });
    }


    handleClearForm() {
        console.log('executed: ');


        // console.log('executed: ');
        // e.preventDefault();
        // const userName = this.state.userName;
        // this.props.onSearchTermChange(userName);
        this.setState({
            confirmDirty: false,
            autoCompleteResult: [],
            userName: '',
            email: '',
            experience: [],
            password: ''
        })

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
            <Form onSubmit={this.handleSubmit} id="reate-course-form">
                <h2>Registration For Stylist</h2>
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
                    label="Working Experience"
                >
                    {getFieldDecorator('experience', {
                        rules: [{ type: 'array', required: true, message: 'Please select your working experience as a stylist!' }],
                    })(
                        <Cascader options={experiences} />
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
                    <center>Already have an account? <a href="/loginForm">Log In</a></center>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(StylistRegistrationForm);
export default WrappedRegistrationForm;