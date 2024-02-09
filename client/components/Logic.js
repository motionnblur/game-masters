import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getCookie } from "cookies-next";
import { setusernamestate } from "../states/userNameStateSlice";

const authUrl = "http://localhost:8080/api/authenticate";
export default function Logic() {
  const currentUserLoginState = useSelector(
    (state) => state.userloginstate.value
  );

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post(
        authUrl,
        {
          cookieData: getCookie("user-id"),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data) {
          dispatch(setusernamestate(res.data));
        }
      });
  }, []);
}
