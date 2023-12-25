import React from "react";
import MenuItem from "./MenuItem";
import { Video, Home, Settings, PieChart } from "react-feather";

export default function Menubar() {
  return (
    <div className="hidden absolute w-16 h-full md:flex justify-center items-center">
      <div className="w-11 h-72 bg-slate-700 rounded-3xl flex flex-col justify-center items-center gap-12 shadow-black shadow-sm">
        <MenuItem icon={<Home />} />
        <MenuItem icon={<Video />} />
        <MenuItem icon={<PieChart />} />
        <MenuItem icon={<Settings />} />
      </div>
    </div>
  );
}
