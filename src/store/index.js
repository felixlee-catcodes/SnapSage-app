import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import collections from './collections';
import files from './files';

const reducer = combineReducers({ collections, files });

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './collections';
export * from './files';
