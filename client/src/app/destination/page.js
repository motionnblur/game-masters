import React from "react";
import Navbar from "../../../components/Navbar";
import Menubar from "../../../components/Menubar";

export default function page() {
  console.log("page");
  return (
    <>
      <Menubar />
      <div className="w-full h-full flex flex-col items-center justify-center sm:gap-3 bg-slate-200">
        <div className="w-[100vh] h-[65vh] bg-slate-300"></div>
      </div>
    </>
  );
}
