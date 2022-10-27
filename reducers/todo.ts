import { AnyAction } from "@reduxjs/toolkit";
import moment from "moment";

type TodoState = {
  mainTodos: Array<TodoData>;
  loadTodoLoading: boolean;
  loadTodoDone: boolean;
};

export type TodoData = {
  id: string;
  title: string;
  content: string;
  date: string;
  isFinished: boolean;
  writer: string;
  writerId: string;
};

export const initialState: TodoState = {
  mainTodos: [],
  loadTodoLoading: false,
  loadTodoDone: false,
};

const ADD_TODO = "ADD_TODO" as const;
const DEL_TODO = "DEL_TODO" as const;
export const LOAD_TODO_LOADING = "LOAD_TODO_LOADING" as const;
export const LOAD_TODO_DONE = "LOAD_TODO_DONE" as const;
export const LOAD_TODO_ME_LOADING = "LOAD_TODO_ME_LOADING" as const;
export const LOAD_TODO_ME_DONE = "LOAD_TODO_ME_DONE" as const;
export const EDIT_TODO = "EDIT_TODO" as const;
export const CHANGE_STATUS = "CHANGE_STATUS" as const;
export const CHANGE_TODO_NICKNAME = "CHANGE_TODO_NICKNAME" as const;

export const addTODO = (data: TodoData) => ({
  type: ADD_TODO,
  data,
});

export const delTODO = (data: string) => ({
  type: DEL_TODO,
  data,
});

function comp_time(first: TodoData, second: TodoData) {
  var res;
  if (first.date === "무기한") {
    res = 1;
  } else if (second.date === "무기한") {
    res = -1;
  } else {
    res = moment(second.date).diff(moment(first.date));
  }
  return res;
}

const reducer = (state: TodoState = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        mainTodos: [action.data, ...state.mainTodos].sort(comp_time),
      };
    case LOAD_TODO_LOADING:
      return {
        ...state,
        loadTodoLoading: true,
        loadTodoDone: false,
      };
    case LOAD_TODO_DONE:
      return {
        ...state,
        loadTodoLoading: false,
        loadTodoDone: true,
        mainTodos: state.mainTodos.concat(action.data).sort(comp_time),
      };
    case LOAD_TODO_ME_LOADING:
      return {
        ...state,
        loadTodoLoading: true,
        loadTodoDone: false,
      };
    case LOAD_TODO_ME_DONE:
      return {
        ...state,
        loadTodoLoading: false,
        loadTodoDone: true,
        mainTodos: state.mainTodos
          .concat(action.data.data)
          .sort(comp_time)
          .filter((e) => e.writerId === action.data.id),
      };
    case CHANGE_STATUS:
      return {
        ...state,
        mainTodos: state.mainTodos.map((e) =>
          e.id === action.data.id ? { ...e, isFinished: action.data.status } : e
        ),
      };
    case EDIT_TODO:
      return {
        ...state,
        mainTodos: state.mainTodos
          .map((e) => (e.id === action.data.id ? action.data : e))
          .sort(comp_time),
      };
    case DEL_TODO:
      return {
        ...state,
        mainTodos: state.mainTodos.filter((e) => e.id !== action.data),
      };
    case CHANGE_TODO_NICKNAME:
      return {
        ...state,
        mainTodos: state.mainTodos.map((e) =>
          e.writerId === action.data.id
            ? { ...e, writer: action.data.nickname }
            : e
        ),
      };
    default:
      return state;
  }
};

export default reducer;
