import * as React from "react";

import { ListTodo } from "./list";
import { connect } from "react-redux";
import { AppState, ITodo } from "../../typings";
import {
  addTodo,
  updateVisibilityFilter,
  clearAllDone
} from "../../store/actions/todos";
import { Footer } from "./footer";
import UndoRedoConnected from "./undo";
export interface IHomeProps {
  todos: ITodo[];
  nowShowing: string;
  addTodo: (title: string) => any;
  updateVisibilityFilter: (title: string) => any;
  clearAllDone: () => void;
}

export interface IHomeState {
  input: string;
}

class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      input: ""
    };
  }
  handleNewTodoKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode !== 13 || !this.state.input) {
      return;
    }
    event.preventDefault();
    this.props.addTodo(this.state.input);
    this.setState({
      input: ""
    });
  };

  completedCount = () => {
    const completedTodos = this.props.todos.filter(
      (item: ITodo) => item.isCompleted
    );

    return completedTodos.length;
  };

  public render() {
    const activeList = this.props.todos.filter((todo: ITodo) => {
      if (this.props.nowShowing === "all") return todo;
      if (this.props.nowShowing === "active") return todo.isCompleted === false;
      if (this.props.nowShowing === "completed")
        return todo.isCompleted === true;
    });
    return (
      <div className="phet">
        <header className="header">
          <h1>todos</h1>
          <input
            ref="newTodo"
            value={this.state.input}
            onKeyDown={this.handleNewTodoKeyDown}
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
              const target = event.currentTarget as HTMLInputElement;
              if (target) {
                this.setState({ input: target.value });
              }
            }}
          />
        </header>
        <UndoRedoConnected />

        <ListTodo todos={activeList} />
        <Footer
          count={this.props.todos.length}
          completedCount={this.completedCount()}
          nowShowing={this.props.nowShowing}
          updateVisibilityFilter={this.props.updateVisibilityFilter}
          onClearCompleted={this.props.clearAllDone}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  // console.log("state:", state);
  return {
    todos: state.present.todos.todos,
    nowShowing: state.present.todos.visibilityFilter
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    addTodo: (title: string) => {
      dispatch(addTodo(title));
    },
    updateVisibilityFilter: (visibility: string) => {
      dispatch(updateVisibilityFilter(visibility));
    },
    clearAllDone: () => {
      dispatch(clearAllDone());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
