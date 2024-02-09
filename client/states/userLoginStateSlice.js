import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
  name: "userloginstate",
  initialState: {
    value: false,
  },
  reducers: {
    setuserloginstate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setuserloginstate } = stateSlice.actions;
export default stateSlice.reducer;
