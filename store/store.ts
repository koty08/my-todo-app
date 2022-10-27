import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { Store } from "redux";
import createSagaMiddleware, { Task } from "redux-saga";

import reducer from "../reducers";
import rootSaga from "../sagas";

export interface SagaStore extends Store {
  sagaTask?: Task;
}
const isDev = process.env.NODE_ENV !== "production";

const store = (context: any) => {
  const sagaMiddleware = createSagaMiddleware();
  const s = configureStore({
    reducer: reducer,
    middleware: [sagaMiddleware],
    devTools: true,
  });
  (s as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return s;
};

export const wrapper = createWrapper(store, {
  debug: process.env.NODE_ENV === "development",
});

// export default wrapper;
