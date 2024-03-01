import React from "react";
import { useSelector } from "react-redux";
export default function UsernameComp() {
  const currentUsernameState = useSelector(
    (state) => state.usernamestate.value
  );
  return (
    <div className="w-full h-14 bg-slate-300 flex items-center justify-center">
      <b>{currentUsernameState}</b>
    </div>
  );
}
