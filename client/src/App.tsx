import React, { useEffect } from "react";
import styled from "styled-components";
import { hot } from "react-hot-loader/root";
import { Switch, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Landing from "./views/Landing/Landing";
import Dashboard from "./views/Dashboard/Dashboard";
import Register from "./views/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import { useHistory } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={DashboardContainer} />
        <Route path="/" component={LandingContainer} />
      </Switch>
    </>
  );
};

const LandingContainer: React.FC = props => {
  const history = useHistory();

  useEffect(() => {
    const remember = localStorage.getItem("remember");
    if (remember) {
      try {
        axios.post("/users/dashboard");
        // set isAuthetnicated to true in the store
        history.push("/dashboard");
      } catch (error) {
        console.log("Invalid session");
      }
    }
  }, [history]);
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
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
