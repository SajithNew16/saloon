import {
    Form, Card, Col, Row
} from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';

const FormItem = Form.Item;

class StylistHomePage extends React.Component {

    state = {
        data: this.props.location.data,
        confirmDirty: false,
        autoCompleteResult: [],
    };

    componentDidMount() {
        console.log('drgdr' + this.state.data);
    }

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
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <h2>Welcome {this.state.data}</h2>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="Your Profile" bordered={false}>Card content</Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Notifications" bordered={false}>Card content</Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Event Calendar" bordered={false}><NavLink to="/eventForm">Enter your new events</NavLink></Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const WrappedStylistHome = Form.create()(StylistHomePage);
export default WrappedStylistHome;