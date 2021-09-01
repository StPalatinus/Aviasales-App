import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import "./index.scss";
import App from "./components/app";
import mainReducer from "./reducers/main_reducer";
import transferFlagsReducer from "./reducers/transfer_flags_reducer";
import filtersReducer from "./reducers/filters_reducer";

const reducer = combineReducers({
  mainReducer,
  transferFlagsReducer,
  filtersReducer,
});

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log("Middleware", store.getState());
  return result;
};

const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware, reduxThunk)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
