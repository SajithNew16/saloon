import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

//components
import Header from './components/headerComponent/header';
import HomePage from './components/pages/homePage';

//includes
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' component={Homepage} />
         
          <Header />
          <HomePage />
          <Link to="/">About</Link>
        </div>
      </Router>
    );
  }
}

export default App;
