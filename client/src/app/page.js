"use client";
import React from "react";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import LoginNew from "../../components/LoginNew/Parent/LoginNew";
import BgFiller from "../../components/LoginNew/Childrens/BgFiller";

export default function page() {
  const userLoginState = useSelector((state) => state.userloginstate.value);

  const VideoLayer = () => {
    return (
      <>
        <video
          controls={false}
          autoPlay={true}
          loop={true}
          muted
          src="warriors.mp4"
          style={{
            zIndex: "0",
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0px",
            objectFit: "cover",
          }}
        />
      </>
    );
  };
  const CardLayer = () => {
    const currentstate = useSelector((state) => state.loginstate.value);
    return (
      <>
        {currentstate && <BgFiller />}
        <div className="w-[70vh] h-[40vh] flex gap-4 justify-center items-center z-10">
          <Card id={0} img={"lol.jpeg"} height={28} width={28} />
          <Card id={1} img={"dota.jpg"} />
        </div>
        {currentstate && <LoginNew />}
      </>
    );
  };
  const BeforeLogin = () => {
    return (
      <>
        <div className="w-full h-full flex flex-col items-center justify-center sm:gap-3 bg-black z-10 overflow-hidden">
          <VideoLayer />
          <CardLayer />
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
