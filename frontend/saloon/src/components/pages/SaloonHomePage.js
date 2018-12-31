import { Form, Card, Col, Row, InputNumber, Button, Input, List } from "antd";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
const Search = Input.Search;
const FormItem = Form.Item;

const { Meta } = Card;

class SaloonHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      userName: "",
      email: "",
      saloonName: "",
      password: "",
      location: "",
      type: "",
      userId: "",
      data: this.props.location.data,
      items: [],
      isLoaded: false
    };
  }

  componentWillMount() {
    console.log("hi " + localStorage.getItem("myData"));
    if (localStorage.getItem("myData") != "data") {
      window.location.href = "/loginForm";
    }
  }

  componentDidMount() {
    console.log("user email " + this.state.data);
    // get user id by email
    // if (this.state.data != null) {
    //   axios
    //     .get("http://localhost:3000/api/user/" + this.state.data)
    //     .then(res => {
    //       this.setState(
    //         {
    //           userId: JSON.stringify(res.data.userId)
    //         },
    //         () => {
    //           console.log(this.state.userId);
    //         }
    //       );
    //     });
    // }

    console.log("user id " + this.state.userId);
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("user id 1st submit " + this.state.userId);

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("user id 2nd submit " + this.state.userId);

        console.log("Received values of form: ", values);
      }
    });
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

  searchByName = value => {
    console.log(value.target.value);
    fetch("http://localhost:3000/api/stylistByChrge/" + value.target.value)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState(
          {
            isLoaded: true,
            items: json.stylist
          },
          () => {
            // console.log('Hi ' , this.state.items[0].userName);
          }
        );
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // const { items } = this.state;
    const { isLoaded, items } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
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
    function onChange(value) {
      console.log("changed", value);
    }
    return (
      <div>
        <div style={{ background: "#ECECEC", padding: "30px" }}>
          <h2>Welcome Saloon Owner</h2>
          <form className="form-inline">
            <div className="form-group">
              <Search
                placeholder="Charging Rating"
                enterButton
                style={{ width: 200 }}
                onChange={e => this.searchByName(e)}
              />
            </div>
          </form>
        </div>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={items}
          renderItem={item => (
            <List.Item>
              <Card
                className="animated pulse"
                id="card"
                style={{ width: 300, height: 380 }}
                hoverable
              >
                <Row>
                  <Col>
                    <img
                      style={{ width: 200, height: 250 }}
                      alt="example"
                      src="user.jpg"
                    />
                  </Col>
                  <Col>
                    <b>
                      {" "}
                      <Meta title={"Name : " + item.userName} />
                    </b>
                    <b>
                      {" "}
                      <Meta title={"Email : " + item.email} />
                    </b>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const WrappedStylistHome = Form.create()(SaloonHomePage);
export default WrappedStylistHome;
