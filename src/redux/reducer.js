import * as Actions from "./actions";
import { combineReducers } from "redux";

const conversation = (state = { isRunning: false }, action) => {
  switch (action.type) {
    case Actions.START_CONVERSATION:
      return { ...state, isRunning: true };
    case Actions.END_CONVERSATION:
      return { ...state, isRunning: false };
    default:
      return state;
  }
};

export default combineReducers({
  conversation
});
