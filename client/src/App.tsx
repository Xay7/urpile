import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { hot } from "react-hot-loader/root";
import { Switch, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import styled from "styled-components";
import axios from "axios";

const App: React.FC = () => {
  useEffect(() => {
    axios.post("/users/login");
  }, []);

  return (
    <>
      <Navbar />
      <Main>
        <Switch>
          <Route exact path="/login" component={Login} />
        </Switch>
      </Main>
    </>
  );
};

const Main = styled.main`
  padding: 0 200px;
`;

export default hot(App);
