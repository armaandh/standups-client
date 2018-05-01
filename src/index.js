import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import AppWithAuth from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, HashRouter, BrowserHistory } from 'react-router-dom'
import { Authenticator } from 'aws-amplify-react';
import AppWithAuth from './AppWithAuth';
window.LOG_LEVEL = 'DEBUG';

ReactDOM.render(
    <BrowserRouter>
        <AppWithAuth />
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
