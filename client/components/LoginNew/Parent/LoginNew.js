import { React, useState } from "react";
import LoginSignButtons from "../Childrens/LoginSignButtons";
import LoginBody from "../Childrens/LoginBody";
import SignupBody from "../Childrens/SignupBody";
import { validateEmail } from "../../../api/Regex";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginNew() {
  const router = useRouter();
  const [signupState, setSignupState] = useState(false);
  const urlSign = "http://localhost:8080/api/create_user";
  const urlLogin = "http://localhost:8080/api/login_user";

  var nameRefVal, lastNameRef, mailRefVal, passRefVal;
  const setNameRefVal = (d) => {
    nameRefVal = d;
  };
  const setLastNameRefVal = (d) => {
    lastNameRef = d;
  };
  const setMailRefVal = (d) => {
    mailRefVal = d;
  };
  const setPassRefVal = (d) => {
    passRefVal = d;
  };

  const doSign = () => {
    signServer();
  };
  const doLogin = () => {
    loginServer();
  };
  const loginServer = () => {
    if (!mailRefVal) return;
    if (!passRefVal) return;

    if (!validateEmail(mailRefVal)) return;

    axios
      .post(
        urlLogin,
        {
          mail: mailRefVal,
          passw: passRefVal,
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
        //console.log(cookie);
        //console.log(response);

        if (response.data !== "successful") return;

        router.push("/userpage");
      });
  };

  const signServer = () => {
    console.log(nameRefVal, lastNameRef, mailRefVal, passRefVal);
    if (!nameRefVal) return;
    if (!lastNameRef) return;
    if (!mailRefVal) return;
    if (!passRefVal) return;
    if (!validateEmail(mailRefVal)) return;

    axios
      .post(urlSign, {
        userName: nameRefVal,
        lastName: lastNameRef,
        mail: mailRefVal,
        passw: passRefVal,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div
      className="absolute w-[32vh] h-[44vh] z-30 bg-cyan-500 rounded-md shadow-slate-500
           shadow-md flex flex-col p-5 gap-3"
    >
      <div className="w-full h-full flex flex-col items-center gap-4">
        <div className="w-full h-12  rounded-md flex flex-row gap-2">
          <LoginSignButtons setSignupState={setSignupState} />
        </div>
        <div className="w-full h-full  rounded-md flex flex-col gap-2">
          {signupState ? (
            <SignupBody
              setNameRefVal={setNameRefVal}
              setLastNameRefVal={setLastNameRefVal}
              setMailRefVal={setMailRefVal}
              setPassRefVal={setPassRefVal}
            />
          ) : (
            <LoginBody
              setMailRefVal={setMailRefVal}
              setPassRefVal={setPassRefVal}
            />
          )}
        </div>
      </div>
      <div className="w-full h-24 flex justify-center items-center">
        <button
          className="w-full h-12 bg-slate-300 rounded-md"
          onClick={() => {
            {
              signupState ? doSign() : doLogin();
            }
          }}
        >
          {signupState ? <b>Sign up</b> : <b>Login</b>}
        </button>
      </div>
    </div>
  );
}
