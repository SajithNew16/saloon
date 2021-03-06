import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/homePage";
import AboutusPage from "./pages/aboutUsPage";
import StylistRegistrationForm from "./pages/stylistRegistrationForm";
import SaloonOwnerRegistrationForm from "./pages/saloonOwnerRegistrationForm";
import LoginForm from "./pages/loginForm";
import StylistHome from "./pages/stylistHomePage";
import SaloonHome from "./pages/SaloonHomePage";
import ContactUs from "./pages/contactUsPage";
import EventForm from "./pages/eventForm";
import StylistProfile from "./pages/stylistProfile";
import SaloonProfile from "./pages/saloonProfile";
import EventForm1 from "./pages/eventform1";

const Body = () => (
  <main>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/aboutus" component={AboutusPage} />
      <Route exact path="/stylistForm" component={StylistRegistrationForm} />
      <Route exact path="/saloonForm" component={SaloonOwnerRegistrationForm} />
      <Route exact path="/loginForm" component={LoginForm} />
      <Route exact path="/stylistHome" component={StylistHome} />
      <Route exact path="/saloonHome" component={SaloonHome} />
      <Route exact path="/contactUs" component={ContactUs} />
      <Route exact path="/eventForm" component={EventForm} />
      <Route exact path="/eventForm1" component={EventForm1} />
      <Route exact path="/stylistProf" component={StylistProfile} />
      <Route exact path="/saloonProf" component={SaloonProfile} />
      <Route exact path="/loginFormOut" component={HomePage} />
    </Switch>
  </main>
);
export default Body;
