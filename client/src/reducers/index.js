//in the reducers all the reducers would come in future

import { combineReducers } from "redux";
import itemReducer from "./itemReducer";

//in combineReducer all the reducers would come
export default combineReducers({
  item: itemReducer,
});
