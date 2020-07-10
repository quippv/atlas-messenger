import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import authReducer from "./store/reducers/auth";
import userReducer from "./store/reducers/user";
import friendReducer from "./store/reducers/friend";
import chatReducer from "./store/reducers/chat";
import * as serviceWorker from "./serviceWorker";
import thunk from "redux-thunk";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  friend: friendReducer,
  chat: chatReducer,
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
