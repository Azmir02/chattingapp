import { createSlice } from "@reduxjs/toolkit";

export const activeChatSlice = createSlice({
  name: "Single",
  initialState: {
    active: null,
  },
  reducers: {
    activeChat: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { activeChat } = activeChatSlice.actions;

export default activeChatSlice.reducer;
