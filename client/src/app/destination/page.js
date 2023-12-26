"use client";
import React from "react";
import Card from "../../../components/Card";
import { useSelector } from "react-redux";

export default function page() {
  const currentstate = useSelector((state) => state.loginstate.value);

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center sm:gap-3 bg-slate-200">
        <div className="w-[70vh] h-[40vh] flex gap-4 justify-center items-center">
          <Card text={<b>lol</b>} id={0} />
          <Card text={<b>dota</b>} id={1} />
        </div>
        {currentstate && (
          <div className="absolute w-3 h-3 z-30 bg-black">a</div>
        )}
      </div>
    </>
  );
}
