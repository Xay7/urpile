import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { hot } from "react-hot-loader/root";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export default hot(App);
