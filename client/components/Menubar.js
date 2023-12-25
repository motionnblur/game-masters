import React from "react";

export default function Menubar() {
  return (
    <div className="hidden absolute w-16 h-full md:flex justify-center items-center">
      <div className="w-10 h-96 bg-slate-700 rounded-2xl flex flex-col justify-center items-center gap-10">
        <div className=" w-8 h-8 bg-slate-100 rounded-full cursor-pointer"></div>
        <div className=" w-8 h-8 bg-slate-100 rounded-full cursor-pointer"></div>
        <div className=" w-8 h-8 bg-slate-100 rounded-full cursor-pointer"></div>
        <div className=" w-8 h-8 bg-slate-100 rounded-full cursor-pointer"></div>
        <div className=" w-8 h-8 bg-slate-100 rounded-full cursor-pointer"></div>
      </div>
    </div>
  );
}
