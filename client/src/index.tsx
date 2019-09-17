import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = process.env.SERVER_URL;
axios.defaults.withCredentials = true;

ReactDOM.render(<App />, document.getElementById("root"));
