"use client";
import React, { useEffect } from "react";
import axios from "axios";

export default function page() {
  const url = "http://localhost:8080/api/authenticate";
  useEffect(() => {
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((res) => {
        const cookieValue = res.headers["set-cookie"];
        console.log(cookieValue);
        //alert(res);
      });
  }, []);
  return (
    <div className="w-full h-full bg-slate-800 flex">
      <div className="m-2 w-full bg-slate-400 flex items-center flex-col">
        <div className="w-full h-14 bg-slate-300"></div>
      </div>
    </div>
  );
}
