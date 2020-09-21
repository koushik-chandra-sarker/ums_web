import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter as Router } from "react-router-dom";
import {Provider} from "react-redux";
import store from "./components/Services/Store";


ReactDOM.render(
  <Router basename="/">
      <Provider store={store}>
          <App />
      </Provider>

  </Router>,
  document.getElementById('root')
);
