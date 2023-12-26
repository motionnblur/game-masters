import { React, useState } from "react";

export default function LoginSignButtons() {
  const [activeIndis, setActiveIndis] = useState(0);
  var active = "bg-lime-400";
  var deactive = "bg-slate-300";
  return (
    <>
      <button
        className={`w-full h-full ${
          activeIndis === 0 ? active : deactive
        } rounded-md `}
        onClick={() => {
          setActiveIndis(0);
        }}
      >
        Login
      </button>
      <button
        className={`w-full h-full ${
          activeIndis === 1 ? active : deactive
        } rounded-md `}
        onClick={() => {
          setActiveIndis(1);
        }}
      >
        Sign up
      </button>
    </>
  );
}
