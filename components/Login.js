import React from "react";

export default function Login() {
  return (
    <div className="absolute flex h-full w-full items-center justify-center bg-black/[.5]">
      <div className="w-[280px] h-[253px] bg-slate-300 flex flex-col items-center mb-[220px]">
        <input
          type="text"
          className="w-[240px] h-[45px] bg-slate-500 mt-[30px]"
          placeholder=" Your e-mail"
        />
        <input
          type="password"
          className="w-[240px] h-[45px] bg-slate-500 mt-[15px]"
          placeholder=" Your password"
        />
        <div className="w-[240px] h-[55px] bg-slate-700 mt-[30px] cursor-pointer" />
      </div>
    </div>
  );
}
