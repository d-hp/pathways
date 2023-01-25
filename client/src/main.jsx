import React from 'react';
import ReactDOM from 'react-dom/client';
import WebFont from 'webfontloader';
WebFont.load({ google: { families: ['Roboto:300,400,500'] } });
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
