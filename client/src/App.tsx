import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { hot } from "react-hot-loader/root";
import { Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route />
      </Switch>
    </>
  );
};

export default hot(App);
