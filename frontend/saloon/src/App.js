import React, { Component } from 'react';

//components
import Header from './components/headerComponent/header';
import Body from './components/body';
import RegistrationForm from './components/pages/RegistrationForm';

//includes
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <RegistrationForm />

        <Body />
      </div>
    );
  }
}

export default App;
