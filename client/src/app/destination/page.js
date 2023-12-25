import React from "react";
import Navbar from "../../../components/Navbar";
import Menubar from "../../../components/Menubar";

export default function page() {
  console.log("page");
  return (
    <>
      <Menubar />
      <div className="w-full h-full sm:p-3 sm:pl-4 sm:pr-4 md:pl-16 md:pr-16 xl:pl-32 xl:pr-32 2xl:pl-72 2xl:pr-72 flex flex-col sm:gap-3 bg-cyan-600">
        <Navbar />
        <div
          id="main-body"
          className="w-full h-full bg-slate-900 sm:rounded-md"
        ></div>
      </div>
    </>
  );
}
