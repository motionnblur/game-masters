import React from "react";

export default function LoginBody(props) {
  return (
    <>
      <div className="w-full h-10 bg-slate-300 rounded-md p-2">
        <input
          type="text"
          id="mail"
          name="mail"
          placeholder="E mail"
          className="w-full h-full bg-slate-300 rounded-md outline-none"
          onChange={(e) => {
            props.setMailRefVal(e.target.value);
          }}
        />
      </div>
      <div className="w-full h-10 bg-slate-300 rounded-md p-2">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="w-full h-full bg-slate-300 rounded-md outline-none"
          onChange={(e) => {
            props.setPassRefVal(e.target.value);
          }}
        />
      </div>
    </>
  );
}
