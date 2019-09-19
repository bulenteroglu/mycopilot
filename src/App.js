import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import LogbookHistory from "./components/logbook/LogbookHistory";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateLogbook from "./components/logbook/CreateLogbook";
import NoMatch from "./components/404/NoMatch";
import LogbookDashboard from "./components/logbook/LogbookDashboard";
import UserLogbook from "./components/logbook/UserLogbook";
import RequestMetar from "./components/metar/RequestMetar";
import PassportDashboard from "./components/passport/PassportDashboard";
import Footer from "./components/layout/Footer";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/logbook/:id" component={LogbookHistory} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/create-logbook" component={CreateLogbook} />
          <Route path="/logbook" component={LogbookDashboard} />
          <Route path="/logbook-history" component={UserLogbook} />
          <Route path="/metar" component={RequestMetar} />
          <Route path="/passport" component={PassportDashboard} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
