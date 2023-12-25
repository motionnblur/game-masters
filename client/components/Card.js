import React from "react";

export default function Card(props) {
  return (
    <div className=" w-48 h-64 bg-slate-700 rounded-md shadow-black shadow-sm cursor-pointer hover:scale-105 transition duration-2000 ease-in-out">
      {props.text}
    </div>
  );
}
