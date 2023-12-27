import { React, useState } from "react";
import LoginSignButtons from "../Childrens/LoginSignButtons";
import LoginBody from "../Childrens/LoginBody";
import SignupBody from "../Childrens/SignupBody";

export default function LoginNew() {
  const [signupState, setSignupState] = useState(false);

  return (
    <div
      className="absolute w-[32vh] h-[40vh] z-30 bg-cyan-500 rounded-md shadow-slate-500
           shadow-md flex flex-col p-5 gap-3"
    >
      <div className="w-full h-full flex flex-col items-center gap-4">
        <div className="w-full h-12  rounded-md flex flex-row gap-2">
          <LoginSignButtons setSignupState={setSignupState} />
        </div>
        <div className="w-full h-full  rounded-md flex flex-col gap-2">
          {signupState ? <SignupBody /> : <LoginBody />}
        </div>
      </div>
      <div className="w-full h-24 flex justify-center items-center">
        <button className="w-full h-12 bg-slate-300 rounded-md">
          {signupState ? <b>Sign up</b> : <b>Login</b>}
        </button>
      </div>
    </div>
  );
}
