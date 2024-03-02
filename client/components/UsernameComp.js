import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";

const authUrl = "http://localhost:8080/api/authenticate";
export default function UsernameComp() {
  const [userName, setUserName] = useState("");

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
        setUserName(res.data);
      })
      .catch((e) => {
        if (e.response.status === 406) {
          dispatch(setuserloginstate(false));
        }
      });
  }, []);
  return (
    <div className="w-full h-14 bg-slate-300 flex items-center justify-center">
      <b>{userName}</b>
    </div>
  );
}
