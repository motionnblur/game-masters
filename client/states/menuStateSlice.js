import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
  name: "menustate",
  initialState: {
    value: 1,
  },
  reducers: {
    setmenustate: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setmenustate } = stateSlice.actions;

export default stateSlice.reducer;
