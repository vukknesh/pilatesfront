import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import store from "./store";
if (localStorage.token) {
  store.dispatch(loadUser());
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
