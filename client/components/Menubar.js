import React from "react";
import MenuItem from "./MenuItem";

export default function Menubar() {
  return (
    <div className="hidden absolute w-16 h-full md:flex justify-center items-center">
      <div className="w-10 h-96 bg-slate-700 rounded-2xl flex flex-col justify-center items-center gap-10">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </div>
  );
}
