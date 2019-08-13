import { combineReducers } from "redux";
import morseReducers from "./morseReducers";
import uiReducer from "./uiReducers";
export default combineReducers({
  morseReducers,
  uiReducer
});
