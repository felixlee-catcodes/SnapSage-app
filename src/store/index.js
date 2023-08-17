import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import collections from './collections';

const reducer = combineReducers({ collections });

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './collections';
