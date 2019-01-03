import React, { Component } from "react";

//components
import Header from "./components/headerComponent/header";
import Body from "./components/body";
import Footer from "./components/footerComponent/footer";

//includes
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App;
