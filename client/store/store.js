import { configureStore } from "@reduxjs/toolkit";
import menuStateReducer from "../states/menuStateSlice";
import loginStateReducer from "../states/loginStateSlice";
import userLoginStateReducer from "../states/userLoginStateSlice";
import userNameStateReducer from "../states/userNameStateSlice";

export default configureStore({
  reducer: {
    menustate: menuStateReducer,
    loginstate: loginStateReducer,
    userloginstate: userLoginStateReducer,
    usernamestate: userNameStateReducer,
  },
});
