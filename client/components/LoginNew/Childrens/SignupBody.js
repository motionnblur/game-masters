import { React, useRef } from "react";

export default function SignupBody(props) {
  const nameRef = useRef(null);
  const mailRef = useRef(null);
  const passRef = useRef(null);

  return (
    <>
      <div className="w-full h-10 bg-slate-300 rounded-md p-2">
        <input
          type="text"
          id="uname"
          name="uname"
          placeholder="User name"
          className="w-full h-full bg-slate-300 rounded-md outline-none"
          onChange={(e) => {
            props.setNameRefVal(e.target.value);
          }}
        />
      </div>
      <div className="w-full h-10 bg-slate-300 rounded-md p-2">
        <input
          type="text"
          id="yname"
          name="yname"
          placeholder="Your name"
          className="w-full h-full bg-slate-300 rounded-md outline-none"
          onChange={(e) => {
            props.setLastNameRefVal(e.target.value);
          }}
        />
      </div>
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
