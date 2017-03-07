import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {browserHistory, hashHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import util from './services/util';

import * as reducers from './reducer';
import AppRouter from './AppRouter';

require('style/root.scss');

const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

const history = syncHistoryWithStore(hashHistory, store);

window.document.documentElement.style.fontSize = util.detectFontSize() + 'px';

ReactDOM.render(
    <Provider store={store}>
        <AppRouter history={history}/>
    </Provider>,
    document.querySelector('.js-app-wrapper')
);
