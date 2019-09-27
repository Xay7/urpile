import React from "react";
import styled from "styled-components";
import { hot } from "react-hot-loader/root";
import { Switch, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Landing from "./views/Landing/Landing";
import Dashboard from "./views/Dashboard/Dashboard";
import Register from "./views/Register/Register";
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={DashboardContainer} />
      </Switch>
    </>
  );
};

// Render navbar for every dashboard route
const DashboardContainer: React.FC = () => (
  <>
    <Navbar />
    <Main>
      <Route exact path="/dashboard" component={Dashboard} />
    </Main>
  </>
);

const Main = styled.main`
  margin-left: 240px;
`;

export default hot(App);
