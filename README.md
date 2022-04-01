## 📌 순서

## [공통]

### 1. store.js 수정

- configureStore import
- 보통 리듀서만 연결
- (선택) SSR할 때만 initialState
- (선택) 미들웨어 연결 `middleware : [firstMiddleware]`
- (선택) devtools 연결 `devTools: process.env.NODE_ENV !== "production",`

## [동기]

### 1. reducers/index.js

- 수정 사항 없음.

### 2. reducers/index.js 수정

- userReducer -> userSlice
- `user : userSlice.reducer`로 수정
- slice란 초기state, reducer, action을 합친 개념. 보통 action은 특정 reducer안에 종속되어 있어 나누지않고 하나로 합쳐 slice를 만듦

### 3. reducers/user.js 수정

- createSlice import
- createSlice로 userSlice만들기
  - `const userSlice = createSlice({})`
  - 리듀서 이름 설정
    - action이름을 넣는 이유는 이름이 추후에 user/login/Pending로 자동 네이밍에 사용되기 위해서이다.
- initialState,
- userReducer,
  - reducers는 immer가 적용되어 있다.
  - action에 들어있는 데이터는 action.data가 아니라 action payload다
  - userReducer에는 동기, 내부 action이 주로 등장한다.
  - ```
    reducers: {
      logOut(state, action) {
        state.data = null;
    }},
    ```

### 4. action/user.js 수정

- slice를 만들면 toolkit이 알아서 action을 만들어준다. 따라서 action의 코드는 삭제해준다.

### 5. App.js 수정

- userSlice가져오기
  `const userSlice = require("./reducers/user");`
- userSlice.action에서 toolkit이 만든 logout 가져오기
- ```
  const onLogout = useCallback(() => { 
    dispatch(userSlice.actions.logOut()); 
    }, []);
   ```

## [비동기]

### 1. reducers/index.js 수정

- 위와 같음

### 2. reducers/index.js 수정

- 위와 같음

### 3. reducers/user.js 수정

- 로그인과 같이 user의 외부와 통신하는 비동기 action은 extraReducers에 적어준다.
- 비동기 요청은 항상 3개가 세트이다. `pending, fulfilled, rejected`는 정해진 워딩이다.

```
extraReducers: {
    [logIn.pending](state, action) {
        state.isLoggingIn = true;
    },
    [logIn.fullfilled](state, action) {
        state.data = action.payload;
        state.isLoggingIn = false;
    },
    [logIn.rejected](state, action) {
        state.data = null;
        state.isLoggingIn = false;
    },
},
```

- 참고) action.data가 아니라 항상 action.payload라고 적어주어야 한다.
- 참고) 불변성이 깨지면 return state를 적어줘야 한다.

### 4. action/user.js 수정

- 동기는 action을 따로 만들 필요가 없기에 action은 비동기의 공간이다.
- createAsyncThunk import
- 액션 정의하기
  - `액션이름, async(호출할 때 받는 데이터, thunkAPI)`;
- login thunk action만들기
  - async이기 때문에 리턴해줘야 하며, 리턴한 data는 success의 데이터로 들어가고,
        - ```
          const logIn = createAsyncThunk("user/login", async (data, thunkAPI) => {
            console.log(data);
                const result = await delay(500, {
                    userId: 1,
                    nickname: "taehee",
                    });
                return result;
                });
            ```

### 5. App.js 수정
- `dispatch(logIn())`으로 CRUD한다.

