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
           shadow-md flex flex-col p-5 gap-3"
          >
            <div className="w-full h-full flex flex-col justify-center items-center gap-4">
              <div className="w-full h-14  rounded-md flex flex-row gap-2">
                <button className="w-full h-full bg-slate-50 rounded-md">
                  Login
                </button>
                <button className="w-full h-full bg-slate-50 rounded-md">
                  Sign up
                </button>
              </div>
              <div className="w-full h-14 bg-slate-300 rounded-md"></div>
              <div className="w-full h-14 bg-slate-300 rounded-md"></div>
            </div>
            <div className="w-full h-24 flex justify-center items-center">
              <button className="w-full h-12 bg-slate-500 rounded-md">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
