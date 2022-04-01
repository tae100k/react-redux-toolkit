//1. createSlice import
import { createSlice } from "@reduxjs/toolkit";
const { logIn } = require("../actions/user");

const initialState = {
  isLoggingIn: false,
  data: null,
};

//2. createSlice로 userSlice만들기
const userSlice = createSlice({
  //action이름을 넣는 이유는 이름이 user/login/Pending이런식으로 이름이 만들어진다.
  //이것을 자동으로 하기 위해 action의 이름을 지어준다.
  //2-1. 리듀서 이름 설정
  name: "user",
  initialState,
  //reducers는 immer가 적용되어 있다.
  //action에 들어있는 데이터는 action.data가 아니라 action.payload다
  //동기, userReducer 내부 action이 주로
  reducers: {
    //ex. logout은 동기 처리 된다.
    //사용자 data를 null로 만들면 logout
    //toolkit이 알아서 action을 만들어준다.
    logOut(state, action) {
      state.data = null;
    },
  },
  //로그인은 user의 외부와 통신하며,
  //비동기이기 때문에
  //비동기, userReducer 외부 action이 주로
  //비동기 요청은 항상 3개가 세트이다.
  //불변성이 깨지면 return state를 적어줘야 한다.
  extraReducers: {
    [logIn.pending](state, action) {
      state.isLoggingIn = true;
    },
    [logIn.fullfilled](state, action) {
      //action.payload, pending, fulfilled, rejected는 정해진 워딩
      state.data = action.payload;
      state.isLoggingIn = false;
    },
    [logIn.rejected](state, action) {
      state.data = null;
      state.isLoggingIn = false;
    },
  },
});

module.exports = userSlice;
