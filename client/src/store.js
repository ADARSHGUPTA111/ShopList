//entry point of redux

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; //for helping with backend
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware),
  window.navigator.userAgent.includes("Chrome")
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    : compose
);

export default store;
