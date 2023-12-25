"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { increment } from "../counterSlice";
import { Camera } from "react-feather";

export default function MenuItem() {
  const dispatch = useDispatch();
  return (
    <div
      className=" w-8 h-8 bg-slate-100 rounded-full cursor-pointer"
      onClick={() => {
        dispatch(increment());
      }}
    >
      <Camera />
    </div>
  );
}
