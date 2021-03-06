import React from "react";
import ReactDOM from "react-dom";
import "./Components/FontAwesomeIcons";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import itemsReducer from "./store/Reducers/itemsReducer";
import categoriesReducer from "./store/Reducers/categoryReducer";
import globalStateReducer from "./store/Reducers/globalStateReducer";
import { BrowserRouter as Router } from "react-router-dom";
import thunk from "redux-thunk";

const loggerMiddleware = (store) => (next) => (action) => {
  console.log(action);
  let result = next(action);
  console.log(store.getState());
  return result;
};

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  combineReducers({
    items: itemsReducer,
    categories: categoriesReducer,
    globalState: globalStateReducer,
  }),
  composeEnhancers(applyMiddleware(loggerMiddleware, thunk))
);
const app = (
  <Provider store={store}>
    <Router basename="/index.html">
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
