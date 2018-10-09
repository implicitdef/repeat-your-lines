import { createStore } from "redux";
import reducer from "./reducer";
import state from "./initialState";

const store = createStore(reducer, state);

export default store;
