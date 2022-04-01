const { combineReducers } = require("redux");
//1. userReducer -> userSlice
const userSlice = require("./user");

module.exports = combineReducers({
  //slice :  초기state, reducer, action을 합친 개념.
  //보통 action은 특정 reducer안에 종속되어 있어 나누지 않고 하나로 합쳐 slice를 만듦
  //2. userSlice.reducer로 수정
  user: userSlice.reducer,
});
