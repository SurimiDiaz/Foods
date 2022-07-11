import rootReducer from "./reducer";
import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
// thunk nos permite trabajar con asincronismo en el front

export default store;
