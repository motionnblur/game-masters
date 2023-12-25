"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { increment } from "../counterSlice";

export default function MenuItem() {
  const dispatch = useDispatch();
  console.log("menu item");
  return (
    <div
      className=" w-8 h-8 bg-slate-100 rounded-full cursor-pointer"
      onClick={() => {
        dispatch(increment());
      }}
    ></div>
  );
}
