import shortId from "shortid";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";

import {
  LOAD_TODO_DONE,
  LOAD_TODO_LOADING,
  LOAD_TODO_ME_DONE,
  LOAD_TODO_ME_LOADING,
} from "../reducers/todo";
import { AnyAction } from "@reduxjs/toolkit";

function* loadPosts(action: AnyAction) {
  // 원래는 API로 받아서 넣어야함
  yield delay(1000);
  yield put({
    type: LOAD_TODO_DONE,
    data: [],
  });
}

function* loadMePosts(action: AnyAction) {
  yield delay(1000);
  yield put({
    type: LOAD_TODO_ME_DONE,
    data: { data: [], id: action.data },
  });
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_TODO_LOADING, loadPosts);
}

function* watchLoadMePosts() {
  yield takeLatest(LOAD_TODO_ME_LOADING, loadMePosts);
}

export default function* todoSaga() {
  yield all([fork(watchLoadPosts), fork(watchLoadMePosts)]);
}
