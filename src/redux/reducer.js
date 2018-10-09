import * as Actions from "./actions";
import { combineReducers } from "redux";

const conversation = (state, action) => {
  switch (action.type) {
    case Actions.START_CONVERSATION:
      return { ...state, isRunning: true };
    case Actions.END_CONVERSATION:
      return { ...state, isRunning: false };
    default:
      return state;
  }
};

export default (previousState, action) =>
  combineReducers({
    conversation
  });
