import React from "react";
import Navbar from "../../../components/Navbar";
import Menubar from "../../../components/Menubar";

export default function page() {
  console.log("page");
  return (
    <>
      <Menubar />
      <div className="w-full h-full flex flex-col sm:gap-3 bg-cyan-600"></div>
    </>
  );
}
