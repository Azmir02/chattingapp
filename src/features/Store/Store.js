import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slice/LoginSlice";
import activeChatSlice from "../Slice/activeSingleSlice";
import modeSlice from "../Slice/themeSlice";

// const reducers = combineReducers({
//   logins: authSlice,
// });

const store = configureStore({
  reducer: {
    login: authSlice,
    activeChat: activeChatSlice,
    themeChange: modeSlice,
  },
});

export default store;
