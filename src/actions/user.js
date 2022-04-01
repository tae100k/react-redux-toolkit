//동기는 action을 따로 만들 필요가 없다.
//tollkit이 action Creator를 해준다.
//action은 비동기의 공간이다.

//1. createAsyncThunk import
import { createAsyncThunk } from "@reduxjs/toolkit";

//(액션이름, async(호출할 때 받는 데이터, thunkAPI));

//2-1. 서버를 대신하여 delay함수 만들기
const delay = (time, value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

//2. login thunk action만들기
//createAsyncThunk에서는 try-catch쓰지 마라.
const logIn = createAsyncThunk("user/login", async (data, thunkAPI) => {
  //ex. get으로 접근하기
  //   thunkAPI.getState();
  //   state.user.data;
  // 리턴해줘야 하며, 리턴한 data는 success의 데이터로 들어가고,
  // throwError가 나면 failure의 에러 데이터
  //기존 : loading, success, failure (잊어라)
  //thunk에서 : pending, fulfilled, rejected
  console.log(data);
  const result = await delay(500, {
    userId: 1,
    nickname: "zerocho",
  });
  return result;
});

export default logIn;
