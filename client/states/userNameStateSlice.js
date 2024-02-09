import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
  name: "usernamestate",
  initialState: {
    value: null,
  },
  reducers: {
    setusernamestate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setusernamestate } = stateSlice.actions;
export default stateSlice.reducer;
