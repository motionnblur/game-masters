"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

export default function page() {
  const url = "http://localhost:8080/api/authenticate";
  const [userName, setUserName] = useState("");
  useEffect(() => {
    //setUserName(getCookie("user-id"));
    axios
      .post(
        url,
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
          setUserName(getCookie("user-id"));
        } else {
          alert("you are no allowed to see this page");
        }
      });
  }, []);
  return (
    <div className="w-full h-full bg-slate-800 flex">
      <div className="m-2 w-full bg-slate-400 flex items-center flex-col">
        <div className="w-full h-14 bg-slate-300">
          <b>Welcome {userName}</b>
        </div>
      </div>
    </div>
  );
}
