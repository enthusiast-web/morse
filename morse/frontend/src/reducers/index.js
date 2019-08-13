import { combineReducers } from "redux";
import morseReducers from "./morseReducers";
import uiReducers from "./uiReducers";
export default combineReducers({
  morseReducers,
  uiReducers
});
