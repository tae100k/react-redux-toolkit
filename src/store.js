import { configureStore } from "@reduxjs/toolkit";

const reducer = require("./reducers");

//2. 커스텀 middleware
const firstMiddleware = (store) => (next) => (action) => {
  console.log("로깅", action);
  next(action);
};

//1. 리듀서만 연결
const store = configureStore({
  reducer,
  //1-1. SSR할 때 여기에 initialState
  //2-1. 미들웨어 연결
  middleware: [firstMiddleware],
  //3. devtools 연결
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
