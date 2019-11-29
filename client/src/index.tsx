import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Theme from './styles/theme';

axios.defaults.baseURL = process.env.SERVER_URL;
axios.defaults.withCredentials = true;

const app = (
  <BrowserRouter>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
