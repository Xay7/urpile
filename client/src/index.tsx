import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Theme from './styles/theme';
import moment from 'moment';

axios.defaults.baseURL = process.env.SERVER_URL;
axios.defaults.withCredentials = true;

moment.updateLocale('en', {
  week: {
    dow: 1
  }
});

let language;
if (window.navigator.languages) {
  language = window.navigator.languages[0];
} else {
  language = window.navigator.language;
}
moment.locale(language);
const app = (
  <BrowserRouter>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
