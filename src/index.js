import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Page from "./components/Page";
import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <Page />
  </Provider>,
  document.getElementById("root")
);
