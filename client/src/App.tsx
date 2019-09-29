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
    <Switch>
      <Navbar />
      <Main>
        <Route exact path="/dashboard" component={Dashboard} />
      </Main>
    </Switch>
  );
};

const Main = styled.main`
  margin-left: 240px;
`;

export default hot(App);
