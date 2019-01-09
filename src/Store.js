import { createStore, compose, applyMiddleware } from "redux";
import InterfaceReducer from "./reducers/interface";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(
  InterfaceReducer,
  composeEnhancer(applyMiddleware(thunk)),
);
