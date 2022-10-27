import { AnyAction } from "@reduxjs/toolkit";
import { TodoData } from "./todo";

export var dummyUsers = [
  {
    id: "user1",
    password: "user1",
    nickname: "유저1",
  },
  {
    id: "user2",
    password: "user2",
    nickname: "유저2",
  },
  {
    id: "user3",
    password: "user3",
    nickname: "유저3",
  },
];

export const initialState: UserState = {
  user: null,
  users: dummyUsers,
  isModifying: false,
  modifyData: null,
  isLoggedIn: false,
  isLoginError: false,
};

type UserState = {
  user: UserData | null;
  users: Array<UserData>;
  isModifying: boolean;
  modifyData: TodoData | null;
  isLoggedIn: boolean;
  isLoginError: boolean;
};

export type UserData = {
  id: string;
  password: string;
  nickname: string;
};

export const LOG_IN_CLICKED = "LOG_IN_CLICKED" as const;
export const LOG_IN_DONE = "LOG_IN_DONE" as const;
export const LOG_IN_FAILED = "LOG_IN_FAILED" as const;
export const LOG_OUT = "LOG_OUT" as const;
export const ADD_USER = "ADD_USER" as const;
export const CHANGE_NICKNAME = "CHANGE_NICKNAME" as const;
export const MODIFYING = "MODIFYING" as const;
export const MODIFY_DONE = "MODIFY_DONE" as const;

const reducer = (state: UserState = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOG_IN_CLICKED:
      return {
        ...state,
        isLoginError: false,
      };
    case LOG_IN_DONE:
      return {
        ...state,
        user: action.data,
        isLoggedIn: true,
      };
    case LOG_IN_FAILED:
      return {
        ...state,
        isLoginError: true,
      };
    case LOG_OUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    case ADD_USER:
      dummyUsers.push(action.data);
      return {
        ...state,
        // users: [...state.users, action.data],
      };
    case MODIFYING:
      return {
        ...state,
        isModifying: true,
        modifyData: action.data,
      };
    case MODIFY_DONE:
      return {
        ...state,
        isModifying: false,
        modifyData: null,
      };
    case CHANGE_NICKNAME:
      const nick: string = action.data.nickname;
      dummyUsers = dummyUsers.map((e) =>
        e.id === action.data.id ? { ...e, nickname: nick } : e
      );
      return {
        ...state,
        user: {
          ...state.user,
          nickname: nick,
        },
        users: state.users.map((e) =>
          e.id === action.data.id ? { ...e, nickname: nick } : e
        ),
      };
    default:
      return state;
  }
};

export default reducer;
