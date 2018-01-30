import Login from './Login.jsx'
import React from 'react'
import {render} from 'react-dom'
import ReactDom from 'react-dom';
import { browserHistory, Router } from 'react-router';
import routes from './routes.js';
import {createStore, applyMiddleware} from 'redux';
import allReducers from './reducers';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunk from "redux-thunk"
import {Provider} from 'react-redux';

// remove tap delay, essential for MaterialUI to work properly
// injectTapEventPlugin();
const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);
const history = syncHistoryWithStore(browserHistory, store)

render(<Provider store={store}>
	     <Router history={browserHistory} routes={routes} /> 
	    </Provider> , document.getElementById('app'))
