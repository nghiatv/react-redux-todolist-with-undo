import * as React from "react";
import classNames from "classnames";
export interface IFooterProps {
  count: number;
  completedCount: number;
  nowShowing: string;
  onClearCompleted: () => any;
  updateVisibilityFilter: (visibility: string) => any;
}

export function Footer(props: IFooterProps) {
  const activeTodoWord = "item";
  var clearButton = null;

  if (props.completedCount > 0) {
    clearButton = (
      <button className="clear-completed" onClick={props.onClearCompleted}>
        Clear completed
      </button>
    );
  }
  const switchFilter = (visibility: string) => {
    props.updateVisibilityFilter && props.updateVisibilityFilter(visibility);
  };

  const nowShowing = props.nowShowing;
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{props.count}</strong> {activeTodoWord} left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            onClick={(event: React.SyntheticEvent) => {
              event.preventDefault();
              switchFilter("all");
            }}
            className={classNames({ selected: nowShowing === "all" })}
          >
            All
          </a>
        </li>{" "}
        <li>
          <a
            href="#/active"
            onClick={(event: React.SyntheticEvent) => {
              event.preventDefault();
              switchFilter("active");
            }}
            className={classNames({ selected: nowShowing === "active" })}
          >
            Active
          </a>
        </li>{" "}
        <li>
          <a
            href="#/completed"
            onClick={(event: React.SyntheticEvent) => {
              event.preventDefault();
              switchFilter("completed");
            }}
            className={classNames({ selected: nowShowing === "completed" })}
          >
            Completed
          </a>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
}
