import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "@reduxjs/toolkit";

import user, { UserState } from "./user";
import todo, { TodoState } from "./todo";
import { combineReducers } from "redux";

export type State = {
  user: UserState;
  todo: TodoState;
};

const rootReducer = (state: State | undefined, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        user,
        todo,
      });
      return combineReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
