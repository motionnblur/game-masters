import { configureStore } from "@reduxjs/toolkit";
import menuStateReducer from "../states/menuStateSlice";
import loginStateReducer from "../states/loginStateSlice";

export default configureStore({
  reducer: {
    menustate: menuStateReducer,
    loginstate: loginStateReducer,
  },
});
