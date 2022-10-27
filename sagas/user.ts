import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "@reduxjs/toolkit";
import {
  CHANGE_NICKNAME,
  dummyUsers,
  LOG_IN_CLICKED,
  LOG_IN_DONE,
  LOG_IN_FAILED,
} from "../reducers/user";
import { CHANGE_TODO_NICKNAME } from "../reducers/todo";

function* doLogin(action: AnyAction) {
  let find = dummyUsers.find(
    (e) => e.id === action.data.id && e.password === action.data.password
  );
  yield delay(1000);
  if (find) {
    yield put({
      type: LOG_IN_DONE,
      data: {
        ...action.data,
        nickname: find.nickname,
      },
    });
  } else {
    yield put({
      type: LOG_IN_FAILED,
    });
  }
}

function* changeTodoNick(action: AnyAction) {
  yield delay(300);
  yield put({
    type: CHANGE_TODO_NICKNAME,
    data: action.data,
  });
}

function* watchLogin() {
  yield takeLatest(LOG_IN_CLICKED, doLogin);
}

function* watchChangeNick() {
  yield takeLatest(CHANGE_NICKNAME, changeTodoNick);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchChangeNick)]);
}
