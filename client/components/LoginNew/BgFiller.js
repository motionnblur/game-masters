import React from "react";
import { useDispatch } from "react-redux";
import { setloginstate } from "../../states/loginStateSlice";

export default function BgFiller() {
  const dispatch = useDispatch();
  return (
    <div
      className="absolute w-full h-full bg-black opacity-60"
      onClick={() => {
        dispatch(setloginstate(false));
      }}
    />
  );
}
