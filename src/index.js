import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import "./index.scss";
import App from "./components/app";
import mainReducer from "./redux/reducers/main-reducer";
import transferFlagsReducer from "./redux/reducers/transfer-flags-reducer";
import filtersReducer from "./redux/reducers/filters-reducer";

const reducer = combineReducers({
  mainReducer,
  transferFlagsReducer,
  filtersReducer,
});

// const loggerMiddleware = (store) => (next) => (action) => {
//   const result = next(action);
//   console.log("Middleware", store.getState());
//   return result;
// };

const store = createStore(
  reducer,
  applyMiddleware(reduxThunk)
  // applyMiddleware(loggerMiddleware, reduxThunk)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
