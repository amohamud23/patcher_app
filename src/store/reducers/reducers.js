import { combineReducers } from "redux";

import authReducer from "./authReducer";
import appConfigReducer from "./appConfigReducer";

export default combineReducers({ authReducer, appConfigReducer });
