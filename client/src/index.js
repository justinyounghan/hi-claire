import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import { setToken } from './helpers/VerifyToken';
import jwt from 'jsonwebtoken';
import { setUser } from './reducers/reducer';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  shadows: Array(25).fill('none'),
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffffcf',
      main: '#fff59d',
      dark: '#cbc26d',
      contrastText: '#212121'
    },
    error: {
      light: '#f05545',
      main: '#b71c1c',
      dark: '#7f0000',
      contrastText: '#ffffff'
    },
    action: {
      light: '#c0cfff',
      main: '#8c9eff',
      dark: '#5870cb',
      contrastText: '#212121'
    },
    disabled: {
      light: '#819ca9',
      main: '#546e7a',
      dark: '#29434e',
      contrastText: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Muli"'
  },
  overrides: {}
});

window.store = configureStore();

if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  window.store.dispatch(setUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={window.store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
// registerServiceWorker();
