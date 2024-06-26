import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getCookie } from "cookies-next";
import { setuserloginstate } from "../states/userLoginStateSlice";

const authUrl = "http://localhost:8080/api/authenticate";
export default function Logic() {
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
      .then(() => {
        dispatch(setuserloginstate(true));
      })
      .catch((e) => {
        if (e.response.status === 406) {
          dispatch(setuserloginstate(false));
        }
      });
  }, []);
}
