import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

axios.defaults.baseURL = process.env.SERVER_URL;
axios.defaults.withCredentials = true;

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));
