import React from "react";
import LoginSignButtons from "./LoginSignButtons";
import LoginBody from "./LoginBody";

export default function LoginNew() {
  return (
    <div
      className="absolute w-[32vh] h-[42vh] z-30 bg-cyan-500 rounded-md shadow-slate-500
           shadow-md flex flex-col p-5 gap-3"
    >
      <div className="w-full h-full flex flex-col items-center gap-4">
        <div className="w-full h-12  rounded-md flex flex-row gap-2">
          <LoginSignButtons />
        </div>
        <div className="w-full h-full  rounded-md flex flex-col gap-2">
          <LoginBody />
        </div>
      </div>
      <div className="w-full h-24 flex justify-center items-center">
        <button className="w-full h-12 bg-slate-300 rounded-md">Login</button>
      </div>
    </div>
  );
}
