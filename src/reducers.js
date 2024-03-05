import { combineReducers } from "redux";

const appReducer = combineReducers({
  user : null,
  attendance: null,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
