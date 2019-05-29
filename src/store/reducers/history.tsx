import * as ACTION from "../types";
import { AnyAction } from "redux";
import { ISnapShoot, AppState } from "../../typings";

export const undoable = (reducer: any) => {
  const historyInitialState: AppState = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  };
  return (state = historyInitialState, action: AnyAction) => {
    const { past, present, future } = state;
    switch (action.type) {
      case ACTION.UNDO:
        const previous: ISnapShoot = past[past.length - 1];
        const newPast: ISnapShoot[] = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: previous,
          future: [present, ...future]
        };
      case ACTION.REDO:
        const next: ISnapShoot = future[0];
        const newFuture: ISnapShoot[] = future.slice(1);
        return {
          past: [...past, present],
          present: next,
          future: newFuture
        };
      default:
        const newPresent: ISnapShoot = reducer(present, action);
        if (present === newPresent) {
          return state;
        }
        return {
          past: [...past, present],
          present: newPresent,
          future: []
        };
    }
  };
};
