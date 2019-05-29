import * as React from "react";
import { ITodo } from "../../typings";
import { removeTodo, updateTodo } from "../../store/actions/todos";
import { connect } from "react-redux";

export interface IToDoItemProps {
  todo: ITodo;
  onToggle: (todo: ITodo, isCompleted: boolean) => any;
  onDestroy: (todo: ITodo) => any;
}

const ToDoItem = (props: IToDoItemProps) => {
  return (
    <li className={`${props.todo.isCompleted ? "completed" : ""}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={props.todo.isCompleted}
          onChange={() => props.onToggle(props.todo, !props.todo.isCompleted)}
        />
        <label>{props.todo.title}</label>

        <button
          className="destroy"
          onClick={() => props.onDestroy(props.todo)}
        />
      </div>
      {/* <input
        ref="editField"
        className="edit"
        value={this.state.editText}
        onBlur={e => this.handleSubmit(e)}
        onChange={e => this.handleChange(e)}
        onKeyDown={e => this.handleKeyDown(e)}
      /> */}
    </li>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onToggle: (todo: ITodo, isCompleted: boolean) => {
      const phet: ITodo = {
        ...todo,
        isCompleted
      };
      dispatch(updateTodo(todo, phet));
    },
    onDestroy: (todo: ITodo) => {
      dispatch(removeTodo(todo));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ToDoItem);
