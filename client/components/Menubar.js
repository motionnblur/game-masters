import React, { useEffect } from "react";
import MenuItem from "./MenuItem";
import { Video, Home, Settings, Upload } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "cookies-next";
import axios from "axios";
import { setuserloginstate } from "../states/userLoginStateSlice";

const authUrl = "http://localhost:8080/api/authenticate";
export default function Menubar() {
  const dispatch = useDispatch();

  const currentUserLoginState = useSelector(
    (state) => state.userloginstate.value
  );

  const AfterLogin = () => {
    return (
      <div className="hidden absolute w-16 h-full md:flex justify-center items-center z-50">
        <div className="w-11 h-56 bg-slate-700 rounded-3xl flex flex-col justify-center items-center gap-12 shadow-black shadow-sm">
          <MenuItem icon={<Video />} id={1} />
          <MenuItem icon={<Upload />} id={2} />
          <MenuItem icon={<Settings />} id={3} />
        </div>
      </div>
    );
  };
  const BeforeLogin = () => {
    return (
      <div className="hidden absolute w-16 h-full md:flex justify-center items-center z-50">
        <div className="w-11 h-72 bg-slate-700 rounded-3xl flex flex-col justify-center items-center gap-12 shadow-black shadow-sm">
          <MenuItem icon={<Home />} id={0} />
          <MenuItem icon={<Video />} id={1} />
          <MenuItem icon={<Upload />} id={2} />
          <MenuItem icon={<Settings />} id={3} />
        </div>
      </div>
    );
  };

  useEffect(() => {
    axios
      .post(
        authUrl,
        {
          cookieData: getCookie("user-id"),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data) {
          dispatch(setuserloginstate(true));
        } else {
          dispatch(setuserloginstate(false));
        }
      });
  }, []);

  if (currentUserLoginState) {
    return <AfterLogin />;
  } else {
    return <BeforeLogin />;
  }
}
