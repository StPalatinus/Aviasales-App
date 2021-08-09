import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./index.scss";
import App from "./components/app";
import reducer from "./components/reducer";
// import * as actions from "./components/actions";

const store = createStore(reducer);
// const { dispatch } = store;

// store.subscribe(() => {
//   console.log(store.getState().counter);
//   console.log(store.getState().someData);
// });

// const { testAction1, testAction2 } = bindActionCreators(actions, dispatch);

// const payload = "test_1";
// testAction1(payload);
// const payload2 = "test_2";
// testAction2(payload2);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
      // testAction1 = {testAction1}
      // testAction2 = {testAction2}
      // payload = {payload}
      // payload2 = {payload2}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
