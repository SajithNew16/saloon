import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homePage';
import AboutusPage from './pages/aboutUsPage';
import StylistRegistrationForm from './pages/stylistRegistrationForm';
import SaloonOwnerRegistrationForm from './pages/saloonOwnerRegistrationForm';

const Body = () => (

    <main>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/aboutus' component={AboutusPage} />
            <Route exact path='/stylistForm' component={StylistRegistrationForm} />
            <Route exact path='/saloonForm' component={SaloonOwnerRegistrationForm} />
        </Switch>
    </main>


)
export default Body;
