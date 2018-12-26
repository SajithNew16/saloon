import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homePage';
import AboutusPage from './pages/aboutUsPage';
import StylistRegistrationForm from './pages/stylistRegistrationForm';
import SaloonOwnerRegistrationForm from './pages/saloonOwnerRegistrationForm';
import LoginForm from './pages/loginForm';
import StylistHome from './pages/stylistHomePage';
import SaloonHome from './pages/SaloonHomePage';
import ContactUs from './pages/contactUsPage';

const Body = () => (

    <main>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/aboutus' component={AboutusPage} />
            <Route exact path='/stylistForm' component={StylistRegistrationForm} />
            <Route exact path='/saloonForm' component={SaloonOwnerRegistrationForm} />
            <Route exact path='/loginForm' component={LoginForm} />
            <Route exact path='/stylistHome' component={StylistHome} />
            <Route exact path='/saloonHome' component={SaloonHome} />
            <Route exact path='/contactUs' component={ContactUs} />
        </Switch>
    </main>


)
export default Body;
