"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { increment } from "../counterSlice";

export default function MenuItem(props) {
  const dispatch = useDispatch();
  return (
    <div
      className="w-8 h-8 bg-slate-100 rounded-full cursor-pointer hover:scale-90 transition duration-2000 ease-in-out"
      onClick={() => {
        dispatch(increment());
      }}
    >
      <div className="w-full h-full flex justify-center items-center">
        {props.icon}
      </div>
    </div>
  );
}
