import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Landing from "./views/Landing/Landing";
import Register from "./views/Register/Register";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Passwords from "./views/Passwords/Passwords";
import Calendar from "./views/Calendar/Calendar";

const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));

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
        <React.Suspense fallback={<div>loading</div>}>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/notes" component={Dashboard} />
            <Route exact path="/dashboard/calendar" component={Calendar} />
            {/* <Route exact path="/dashboard/passwords" component={Passwords} /> */}
            <Route exact path="/dashboard/logout" component={Dashboard} />
            <Route path="/dashboard/*" component={() => <div>Make 404 page here</div>} />
          </Switch>
        </React.Suspense>
      </Main>
    </>
  );
};

const Main = styled.main`
  width: calc(100vw - 240px);
  height: 100%;
  padding: 30px;
  margin-left: 240px;
  box-sizing: border-box;
`;

export default App;
