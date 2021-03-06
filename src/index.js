import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.scss';

import store from "./store";

ReactDOM.render(
    <Provider store={store}>
            <Router>
                <App />
            </Router>
    </Provider>,
  document.getElementById('root')
);

