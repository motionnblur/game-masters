import React from "react";

export default function LoginNew() {
  var active_color = "bg-lime-400";
  return (
    <div
      className="absolute w-[32vh] h-[42vh] z-30 bg-cyan-500 rounded-md shadow-slate-500
           shadow-md flex flex-col p-5 gap-3"
    >
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <div className="w-full h-11  rounded-md flex flex-row gap-2">
          <button className={`w-full h-full ${active_color} rounded-md `}>
            Login
          </button>
          <button className="w-full h-full bg-slate-50 rounded-md">
            Sign up
          </button>
        </div>
        <div className="w-full h-14 bg-slate-300 rounded-md p-2">
          <input
            type="text"
            id="mail"
            name="mail"
            placeholder="E mail"
            className="w-full h-full bg-slate-300 rounded-md outline-none"
          />
        </div>
        <div className="w-full h-14 bg-slate-300 rounded-md p-2">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full h-full bg-slate-300 rounded-md outline-none"
          />
        </div>
      </div>
      <div className="w-full h-24 flex justify-center items-center">
        <button className="w-full h-12 bg-slate-500 rounded-md">Login</button>
      </div>
    </div>
  );
}
