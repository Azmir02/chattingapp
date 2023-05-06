import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slice/LoginSlice";
import activeChatSlice from "../Slice/activeSingleSlice";

// const reducers = combineReducers({
//   logins: authSlice,
// });

const store = configureStore({
  reducer: {
    login: authSlice,
    activeChat: activeChatSlice,
  },
});

export default store;
