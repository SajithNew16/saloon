import React, { Component } from 'react';

//components
import Header from './components/headerComponent/header';
import Body from './components/body';
// import StylistForm from './components/pages/stylistForm';

//includes
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {/* <StylistForm /> */}
        <Body />
      </div>
    );
  }
}

export default App;
