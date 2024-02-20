import { React, useState } from "react";
import LoginSignButtons from "../Childrens/LoginSignButtons";
import LoginBody from "../Childrens/LoginBody";
import SignupBody from "../Childrens/SignupBody";
import { validateEmail } from "../../../api/Regex";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setuserloginstate } from "../../../states/userLoginStateSlice";

export default function LoginNew() {
  const dispatch = useDispatch();

  const router = useRouter();
  const [signupState, setSignupState] = useState(false);
  const [activeIndis, setActiveIndis] = useState(0);
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
        },
      )
      .then((response) => {
        //const cookie = getCookie("user-id");
        //console.log(cookie);
        //console.log(response);

        if (response.data !== "successful") return;

        dispatch(setuserloginstate(true));
        router.push("/userpage");
      });
  };

  const signServer = () => {
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
        setSignupState(false);
        setActiveIndis(0);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <div
      className="absolute w-[330px] h-[480px] z-30 bg-[#262626] rounded-md
           shadow-md flex flex-col p-5 gap-3"
    >
      <div className="w-full h-full flex flex-col items-center gap-4">
        <div className="w-full h-12  rounded-md flex flex-row gap-2">
          <LoginSignButtons
            setSignupState={setSignupState}
            activeIndis={activeIndis}
            setActiveIndis={setActiveIndis}
          />
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
