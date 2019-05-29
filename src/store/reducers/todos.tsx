import { ITodoStore, ITodo } from "../../typings";
import { AnyAction } from "redux";
import * as ACTION from "../types";
const todoInitialState: ITodoStore = {
  todos: [],
  visibilityFilter: "all"
};
export const todos = (
  state: ITodoStore = todoInitialState,
  action: AnyAction
) => {
  switch (action.type) {
    case ACTION.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case ACTION.REMOVE_TODO:
      const removedTodo: ITodo = action.payload;
      const newTodos = state.todos.filter((todo: ITodo) => {
        return (
          todo.title !== removedTodo.title &&
          todo.createdAt !== removedTodo.createdAt
        );
      });
      return {
        ...state,
        todos: newTodos
      };

    case ACTION.UPDATE_TODO:
      const {
        todo,
        updatedTodo
      }: { todo: ITodo; updatedTodo: ITodo } = action.payload;
      const newList = state.todos.map((item: ITodo) => {
        if (item.title === todo.title && item.createdAt === todo.createdAt) {
          return updatedTodo;
        }
        return item;
      });
      return {
        ...state,
        todos: newList
      };

    case ACTION.UPDATE_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: action.payload
      };

    case ACTION.CLEAR_ALL_DONE:
      const clearAllDone = state.todos.filter(
        (todo: ITodo) => !todo.isCompleted
      );
      return {
        ...state,
        todos: clearAllDone
      };
    default:
      return state;
  }
};
