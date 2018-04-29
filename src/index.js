import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppWithAuth from './AppWithAuth';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, HashRouter, BrowserHistory } from 'react-router-dom'
import { Authenticator } from 'aws-amplify-react';
window.LOG_LEVEL = 'DEBUG';

ReactDOM.render(
    <BrowserRouter>
        <AppWithAuth />
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
