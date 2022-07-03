import { createStore, applyMiddleware } from "redux";

//Middlewares
import { composeWithDevTools } from "redux-devtools-extension";

//Redux
import { reducer } from "./reducers";

const middleware = [];
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
