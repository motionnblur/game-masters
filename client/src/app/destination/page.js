import React from "react";
import Card from "../../../components/Card";

export default function page() {
  console.log("page");
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center sm:gap-3 bg-slate-200">
        <div className="w-[70vh] h-[40vh] flex gap-4 justify-center items-center">
          <Card text={<b>lol</b>} />
          <Card text={<b>dota</b>} />
        </div>
      </div>
    </>
  );
}
