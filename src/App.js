import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
const { logIn } = require("./actions/user");
//1. userSlice가져오기
const userSlice = require("./reducers/user");

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(
      logIn({
        id: "zerocho",
        password: "비밀번호",
      })
    );
  }, []);

  //2. userSlice.action에서 toolkit이 만든 logout 가져오기
  const onLogout = useCallback(() => {
    dispatch(userSlice.actions.logOut());
  }, []);

  return (
    <div>
      {user.isLoggingIn ? (
        <div>로그인 중</div>
      ) : user.data ? (
        <div>{user.data.nickname}</div>
      ) : (
        "로그인 해주세요."
      )}
      {!user.data ? (
        <button onClick={onClick}>로그인</button>
      ) : (
        <button onClick={onLogout}>로그아웃</button>
      )}
    </div>
  );
};

export default App;
