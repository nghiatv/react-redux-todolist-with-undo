import * as React from "react";
import { ITodo } from "../../typings";
import Item from "./item";

export interface IListProps {
  todos: ITodo[];
}

export const ListTodo = ({ todos }: IListProps) => {
  return (
    <ul className="phet-list">
      {todos.map((todo: ITodo) => {
        return <Item todo={todo} key={todo.createdAt} />;
      })}
    </ul>
  );
};
