import { ITodo } from "../../typings";
import * as ACTION from "../types";

export const addTodo = (title: string) => {
  const newTodo: ITodo = {
    title,
    isCompleted: false,
    createdAt: new Date().toISOString()
  };
  return {
    type: ACTION.ADD_TODO,
    payload: newTodo
  };
};

export const removeTodo = (todo: ITodo) => {
  return {
    type: ACTION.REMOVE_TODO,
    payload: todo
  };
};

export const updateTodo = (todo: ITodo, updatedTodo: ITodo) => {
  return {
    type: ACTION.UPDATE_TODO,
    payload: {
      todo,
      updatedTodo
    }
  };
};

export const updateVisibilityFilter = (visibility: string) => {
  return {
    type: ACTION.UPDATE_VISIBILITY_FILTER,
    payload: visibility
  };
};

export const clearAllDone = () => {
  return {
    type: ACTION.CLEAR_ALL_DONE
  };
};
