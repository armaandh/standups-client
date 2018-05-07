import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import AppWithAuth from './AppWithAuth';
//window.LOG_LEVEL = 'DEBUG';

ReactDOM.render(
    <BrowserRouter>
        <AppWithAuth />
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
