"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setmenustate } from "../states/menuStateSlice";
import { useRouter } from "next/navigation";

export default function MenuItem(props) {
  const router = useRouter();
  const currentstate = useSelector((state) => state.menustate.value);
  const dispatch = useDispatch();
  const de_activecolor = "bg-slate-100";
  const active_color = "bg-lime-400";
  var current_color = de_activecolor;

  switch (currentstate) {
    case 0:
      if (props.id === 0) {
        current_color = active_color;
        router.push("/");
      }
      break;
    case 1:
      if (props.id === 1) {
        current_color = active_color;
        router.push("/videospage");
      }
      break;
    case 2:
      if (props.id === 2) {
        current_color = active_color;
        router.push("/uploadpage");
      }
      break;
    case 3:
      if (props.id === 3) {
        current_color = active_color;
        router.push("/userpage");
      }
      break;
  }

  return (
    <div
      className={`w-8 h-8 ${current_color} rounded-full cursor-pointer hover:scale-90 transition duration-2000 ease-in-out`}
      onClick={() => {
        dispatch(setmenustate(props.id));
      }}
    >
      <div className="w-full h-full flex justify-center items-center">
        {props.icon}
      </div>
    </div>
  );
}
