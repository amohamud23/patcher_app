import { combineReducers } from "redux";

import authReducer from "./authReducer";
import appConfigReducer from "./appConfigReducer";
import driverReducer from "./driverReducer";

export default combineReducers({
  authReducer,
  appConfigReducer,
  driverReducer,
});
