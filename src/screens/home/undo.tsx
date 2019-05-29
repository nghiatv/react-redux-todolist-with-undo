import React, { Dispatch } from "react";
import { undo, redo } from "../../store/actions/history";
import { connect } from "react-redux";
import { AppState } from "../../typings";
import { AnyAction } from "redux";

export interface IUndoRedoProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }: IUndoRedoProps) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: 60,
      paddingLeft: 20,
      paddingRight: 20
    }}
  >
    <button onClick={() => onUndo()} disabled={!canUndo}>
      Undo
    </button>
    <button onClick={() => onRedo()} disabled={!canRedo}>
      Redo
    </button>
  </div>
);

const mapStateToProps = (state: AppState) => {
  return {
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    onUndo: () => dispatch(undo()),
    onRedo: () => dispatch(redo())
  };
};

const UndoRedoConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo);

export default UndoRedoConnected;
