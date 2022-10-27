import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "@reduxjs/toolkit";

import user from "./user";
import todo from "./todo";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  index: (state = {}, action: AnyAction) => {
    switch (action.type) {
      case HYDRATE:
        return { state, ...action.payload };
      default:
        return state;
    }
  },
  user: user,
  todo: todo,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
