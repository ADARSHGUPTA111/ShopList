//in the reducers all the reducers would come in future

import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

//in combineReducer all the reducers would come
export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
});
