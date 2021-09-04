import React from "react";
import ReactDOM, { hydrate, render } from "react-dom";
import App from "./App";
//import "./styles/index.scss";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/usersAction";
import "antd/dist/antd.css";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import { getPosts } from "./actions/postAction";
import { getParam } from "./actions/paramAction";
import { getSection } from "./actions/sectionAction";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers());
store.dispatch(getPosts());
store.dispatch(getParam());
store.dispatch(getSection());

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
} else {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
}
