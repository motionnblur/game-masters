import { configureStore } from "@reduxjs/toolkit";
import menuStateReducer from "../states/menuStateSlice";

export default configureStore({
  reducer: {
    menustate: menuStateReducer,
  },
});
