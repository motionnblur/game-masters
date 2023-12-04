import React, { useEffect, useRef } from "react";
import { validateEmail } from "../api/Regex";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Login(props) {
  const router = useRouter();
  const url = "http://localhost:8080/api/login_user";
  const mailRef = useRef(null);
  const passRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        props.closeLoginForm();
      } else if (event.key === "Enter") {
        sendToServer();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const sendToServer = () => {
    if (!mailRef.current.value) return;
    if (!passRef.current.value) return;

    if (!validateEmail(mailRef.current.value)) return;

    axios
      .post(
        url,
        {
          mail: mailRef.current.value,
          passw: passRef.current.value,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const cookie = getCookie("user-id");
        console.log(cookie);
        alert(response.data);

        if (response.data !== "successful") return;

        router.push("/userpage");
      });
  };

  return (
    <div className="absolute flex h-full w-full items-center justify-center bg-black/[.5]">
      <div className="w-[280px] h-[253px] bg-slate-300 flex flex-col items-center mb-[220px]">
        <input
          type="text"
          className="w-[240px] h-[45px] bg-slate-500 mt-[30px]"
          placeholder=" Your e-mail"
          ref={mailRef}
        />
        <input
          type="password"
          className="w-[240px] h-[45px] bg-slate-500 mt-[15px]"
          placeholder=" Your password"
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
