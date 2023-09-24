"use client";
import { useState } from "react";
import Login from "../../components/Login";
export default function Home() {
  const [loginForm, setLoginForm] = useState(false);
  const OpenLoginForm = () => {
    setLoginForm(true);
  };
  return (
    <div className="w-full h-full bg-slate-800 flex">
      <div className="m-2 w-full bg-slate-400 flex justify-center items-center">
        <div className="w-[540px] h-[800px] bg-slate-600 flex flex-col">
          <div
            className="bg-gray-900 w-full h-1/6 flex justify-center items-center cursor-pointer"
            onClick={OpenLoginForm}
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
                <b className="text-2xl text-slate-200 cursor-pointer">Lol</b>
                <b className="text-2xl text-slate-200 cursor-pointer">Dota</b>
                <b className="text-2xl text-slate-200 cursor-pointer">Cs Go</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loginForm && <Login />}
    </div>
  );
}
