import { combineReducers } from "redux";
import { todos } from "./todos";

export const reducer = combineReducers({
  todos: todos
});
