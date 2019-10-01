import React from "react";
import styled from "styled-components";
import { hot } from "react-hot-loader/root";
import { Switch, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Landing from "./views/Landing/Landing";
import Dashboard from "./views/Dashboard/Dashboard";
import Register from "./views/Register/Register";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Passwords from "./views/Passwords/Passwords";

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <PrivateRoute path="/dashboard" component={DashboardLayout} />
        <Route path="/" component={LandingLayout} />
      </Switch>
    </>
  );
};

const LandingLayout = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  );
};

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Main>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/notes" component={Dashboard} />
          <Route exact path="/dashboard/calendar" component={Dashboard} />
          <Route exact path="/dashboard/passwords" component={Passwords} />
          <Route exact path="/dashboard/logout" component={Dashboard} />
        </Switch>
      </Main>
    </>
  );
};

const Main = styled.main`
  width: calc(100vw - 240px);
  height: 100%;
  margin-left: 240px;
  padding: 50px;
  box-sizing: border-box;
`;

export default hot(App);
