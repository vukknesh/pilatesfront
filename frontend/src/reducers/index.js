import { combineReducers } from "redux";

import auth from "./auth";
import profiles from "./profiles";

import eventos from "./eventos";

export default combineReducers({
  auth,
  profiles,

  eventos
});
