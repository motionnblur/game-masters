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
          <div
            className="absolute w-[32vh] h-[45vh] z-30 bg-cyan-500 rounded-md shadow-slate-500
           shadow-md flex flex-col p-6 gap-3"
          >
            <div className="w-full h-full flex flex-col justify-center items-center gap-4">
              <div className="w-full h-14 bg-lime-600"></div>
              <div className="w-full h-14 bg-slate-300"></div>
              <div className="w-full h-14 bg-slate-300"></div>
            </div>
            <div className="w-full h-24 flex justify-center items-center">
              <button className="w-full h-12 bg-slate-500">Login</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
