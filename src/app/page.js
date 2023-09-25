"use client";
import { useState } from "react";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
export default function Home() {
  const [loginForm, setLoginForm] = useState(false);
  const [signupForm, setSignupForm] = useState(false);
  const openLoginForm = () => {
    setLoginForm(true);
  };
  const closeLoginForm = () => {
    setLoginForm(false);
  };
  const openSignupForm = () => {
    setSignupForm(true);
  };
  const closeSignupForm = () => {
    setSignupForm(false);
  };
  return (
    <div className="w-full h-full bg-slate-800 flex">
      <div className="m-2 w-full bg-slate-400 flex justify-center items-center">
        <div className="w-[540px] h-[800px] bg-slate-600 flex flex-col">
          <div
            className="bg-gray-900 w-full h-1/6 flex justify-center items-center cursor-pointer"
            onClick={openLoginForm}
          >
            <b className="text-slate-200 pointer-events-none">
              Do you already have an account ?
            </b>
          </div>
          <div className=" bg-gray-800 w-full h-5/6 flex justify-center items-center flex-col">
            <div className="h-1/6 w-full flex justify-center items-center">
              <b className="text-slate-200 pointer-events-none">
                Choose your destination to become Master
              </b>
            </div>
            <div className="h-5/6 w-full flex justify-center items-center">
              <div className="bg-slate-600 h-1/3 w-2/3 mb-32 flex justify-center items-center gap-5">
                <b
                  className="text-2xl text-slate-200 cursor-pointer"
                  onClick={openSignupForm}
                >
                  Lol
                </b>
                <b
                  className="text-2xl text-slate-200 cursor-pointer"
                  onClick={openSignupForm}
                >
                  Dota
                </b>
                <b
                  className="text-2xl text-slate-200 cursor-pointer"
                  onClick={openSignupForm}
                >
                  Cs Go
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loginForm && <Login closeLoginForm={closeLoginForm} />}
      {signupForm && <Signup closeSignupForm={closeSignupForm} />}
    </div>
  );
}
