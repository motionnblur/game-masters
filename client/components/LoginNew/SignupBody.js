import React from "react";

export default function SignupBody() {
  return (
    <>
      <div className="w-full h-10 bg-slate-300 rounded-md p-2">
        <input
          type="text"
          id="mail"
          name="mail"
          placeholder="User name"
          className="w-full h-full bg-slate-300 rounded-md outline-none"
        />
      </div>
      <div className="w-full h-10 bg-slate-300 rounded-md p-2">
        <input
          type="text"
          id="mail"
          name="mail"
          placeholder="E mail"
          className="w-full h-full bg-slate-300 rounded-md outline-none"
        />
      </div>
      <div className="w-full h-10 bg-slate-300 rounded-md p-2">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="w-full h-full bg-slate-300 rounded-md outline-none"
        />
      </div>
    </>
  );
}
