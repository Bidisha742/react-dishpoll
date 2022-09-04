 import { combineReducers, createStore } from "redux";
import { loginReducer } from "./reducer";

const reducers = combineReducers({
  login: loginReducer
});

export const store = createStore(reducers);
