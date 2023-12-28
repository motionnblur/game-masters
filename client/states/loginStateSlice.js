import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
  name: "loginstate",
  initialState: {
    value: false,
  },
  reducers: {
    setloginstate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setloginstate } = stateSlice.actions;
export default stateSlice.reducer;
