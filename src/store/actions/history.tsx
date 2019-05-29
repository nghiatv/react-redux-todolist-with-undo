import * as ACTION from "../types";

export const undo = () => {
  return {
    type: ACTION.UNDO
  };
};

export const redo = () => {
  return {
    type: ACTION.REDO
  };
};
