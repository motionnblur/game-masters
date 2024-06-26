"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { setloginstate } from "../states/loginStateSlice";

export default function Card(props) {
  const dispatch = useDispatch();
  const onCLickFunc = () => {
    dispatch(setloginstate(true));
  };
  return (
    <div
      className=" w-48 h-64 bg-black rounded-md shadow-black shadow-sm cursor-pointer hover:scale-105 transition duration-2000 ease-in-out
       flex justify-center items-center overflow-hidden"
      onClick={onCLickFunc}
    >
      <img src={props.img} className={`w-${props.width} h-${props.height}`} />
    </div>
  );
}
