import { DatePicker } from 'antd';
import React from 'react';
import {
    Form, Input, Button
} from 'antd';

const FormItem = Form.Item;

class EventForm extends React.Component {
    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
    };

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // axios.post('http://localhost:3000/api/stylists', values).then(response => {
                //     console.log("Successful" + response);
                //     if (response.data.success) {
                //         $('#clearButton').trigger("click");
                //         var retVal = window.confirm("Successfully registered! Do you want to continue?");
                //         if (retVal === true) {
                //             $('#nextPage').trigger("click");
                //             // window.location.href = "http://localhost:3001/stylistHome";
                //             return true;
                //         }
                //         else {
                //             return false;
                //         }
                //     } else {
                //         alert("Email has already existing! So you should have an account in Comcast. If you have any queries please post it on our contact us page");
                //         console.log(response.data.error)
                //     }
                // })
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
                xs: { span: 14 },
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
        const { startValue, endValue, endOpen } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <h2>Add your assigned jobs</h2>
                <FormItem
                    {...formItemLayout}
                    label="Saloon Name"
                >
                    {getFieldDecorator('saloonName', {
                        rules: [{ required: true, message: 'Please input your assigned Saloon Name!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Task"
                >
                    {getFieldDecorator('task', {
                        rules: [{ required: true, message: 'Please input your assigned task!', whitespace: true }],
                    })(
                        <TextArea />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Start Date"
                >
                    {getFieldDecorator('startValue', {
                        rules: [{
                            required: true, message: 'Please input your Starting Date for the assigned task',
                        }],
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
                <FormItem
                    {...formItemLayout}
                    label="End Date"
                >
                    {getFieldDecorator('endValue', {
                        rules: [{
                            required: true, message: 'Please input your Ending Date for the assigned task',
                        }],
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
                    <Button type="primary" htmlType="submit">Add to Event Calendar</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedStylistHome = Form.create()(EventForm);
export default WrappedStylistHome;
