import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "Login",
  initialState: {
    loggedIn: localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : null,
  },
  reducers: {
    Loginusers: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { Loginusers } = userSlice.actions;

export default userSlice.reducer;
