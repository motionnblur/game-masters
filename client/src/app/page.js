"use client";
import React from "react";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import LoginNew from "../../components/LoginNew/Parent/LoginNew";
import BgFiller from "../../components/LoginNew/Childrens/BgFiller";

export default function page() {
  const currentstate = useSelector((state) => state.loginstate.value);
  const userLoginState = useSelector((state) => state.userloginstate.value);

  const BeforeLogin = () => {
    return (
      <>
        {currentstate && <BgFiller />}
        <div className="w-full h-full flex flex-col items-center justify-center sm:gap-3 bg-gray-800">
          <div className="w-[70vh] h-[40vh] flex gap-4 justify-center items-center">
            <Card id={0} img={"lol.jpeg"} height={28} width={28} />
            <Card id={1} img={"dota.jpg"} />
          </div>
          {currentstate && <LoginNew />}
        </div>
      </>
    );
  };
  const AfterLogin = () => {
    return (
      <>
        <b>Hi</b>
      </>
    );
  };

  if (userLoginState == null) return;

  if (userLoginState) {
    return <AfterLogin />;
  } else {
    return <BeforeLogin />;
  }
}
