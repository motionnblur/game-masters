import React, { useEffect, useRef } from "react";
import { validateEmail } from "../api/Regex";
import axios from "axios";

export default function Signup(props) {
  const url = "http://localhost:8080/api/create_user";
  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const mailRef = useRef(null);
  const passRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        props.closeSignupForm();
      } else if (event.key === "Enter") {
        sendToServer();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const sendToServer = () => {
    if (!nameRef.current.value) return;
    if (!lastnameRef.current.value) return;
    if (!mailRef.current.value) return;
    if (!passRef.current.value) return;

    if (!validateEmail(mailRef.current.value)) return;

    axios
      .post(url, {
        userName: nameRef.current.value,
        lastName: lastnameRef.current.value,
        mail: mailRef.current.value,
        passw: passRef.current.value,
      })
      .then((res) => {
        alert(res.data);
        props.closeSignupForm();
      });
  };

  return (
    <div className="absolute flex h-full w-full items-center justify-center bg-black/[.5]">
      <div className="w-[280px] h-[373px] bg-slate-300 flex flex-col items-center mb-[220px]">
        <input
          type="text"
          className="w-[240px] h-[45px] bg-slate-500 mt-[30px]"
          placeholder=" First Name"
          ref={nameRef}
        />
        <input
          type="text"
          className="w-[240px] h-[45px] bg-slate-500 mt-[15px]"
          placeholder=" Last Name"
          ref={lastnameRef}
        />
        <input
          type="text"
          className="w-[240px] h-[45px] bg-slate-500 mt-[15px]"
          placeholder=" Email"
          ref={mailRef}
        />
        <input
          type="password"
          className="w-[240px] h-[45px] bg-slate-500 mt-[15px]"
          placeholder=" Password"
          ref={passRef}
        />
        <div
          className="w-[240px] h-[55px] bg-slate-700 mt-[30px] cursor-pointer"
          onClick={sendToServer}
        />
      </div>
    </div>
  );
}
