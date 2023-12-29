"use client";
import React from "react";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import LoginNew from "../../components/LoginNew/Parent/LoginNew";
import BgFiller from "../../components/LoginNew/Childrens/BgFiller";
import Player from "../../components/Player";

export default function page() {
  const currentstate = useSelector((state) => state.loginstate.value);

  return (
    <>
      <video width={400} controls>
        <source
          src="http://localhost:8081/getFile/test.webm"
          type="video/webm"
        />
      </video>
      {currentstate && <BgFiller />}
      <div className="w-full h-full flex flex-col items-center justify-center sm:gap-3 bg-slate-200">
        <div className="w-[70vh] h-[40vh] flex gap-4 justify-center items-center">
          <Card text={<b>lol</b>} id={0} />
          <Card text={<b>dota</b>} id={1} />
        </div>
        {currentstate && <LoginNew />}
      </div>
    </>
  );
}
