import { all, fork } from "redux-saga/effects";

import todoSaga from "./todo";
import userSaga from "./user";

export default function* rootSaga() {
  yield all([fork(todoSaga), fork(userSaga)]);
}
