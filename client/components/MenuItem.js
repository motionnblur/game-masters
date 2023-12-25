"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setmenustate } from "../menuStateSlice";

export default function MenuItem(props) {
  const currentstate = useSelector((state) => state.menustate.value);
  const dispatch = useDispatch();
  return (
    <div
      className="w-8 h-8 bg-slate-100 rounded-full cursor-pointer hover:scale-90 transition duration-2000 ease-in-out"
      onClick={() => {
        dispatch(setmenustate(props.id));
      }}
    >
      <div className="w-full h-full flex justify-center items-center">
        {props.icon}
      </div>
      {currentstate}
    </div>
  );
}
