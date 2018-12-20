import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homePage';
import AboutusPage from './pages/aboutUsPage';
import StylistForm from './pages/stylistForm';


const Body = () => (

    <main>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/aboutus' component={AboutusPage} />
            <Route exact path='/stylistForm' component={StylistForm} />
        </Switch>
    </main>


)
export default Body;
