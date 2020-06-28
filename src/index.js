import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import {Provider} from 'react-redux';
import ErrorBoundary from "./components/error-boundary";
import SoundtracksService from "./services/soundtracks-service";
import {SoundtracksStoreServiceProvider} from "./components/soundtracks-service-context";
import {BrowserRouter as Router} from 'react-router-dom';
import './index.scss';

import store from "./store";

const SoundtrackService = new SoundtracksService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <SoundtracksStoreServiceProvider value={SoundtrackService}>
                <Router>
                    <App />
                </Router>
            </SoundtracksStoreServiceProvider>
        </ErrorBoundary>
    </Provider>,
  document.getElementById('root')
);

