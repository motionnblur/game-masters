import React, { useEffect } from "react";
import MenuItem from "./MenuItem";
import { Video, Home, Settings, Upload } from "react-feather";
import { useSelector } from "react-redux";

export default function Menubar() {
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
    console.log(currentUserLoginState);
  });

  if (currentUserLoginState) {
    return <AfterLogin />;
  } else {
    return <BeforeLogin />;
  }
}
