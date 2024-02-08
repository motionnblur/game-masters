import React, { useState } from "react";

export default function Thumbnail(props) {
  const [click, setClick] = useState(false);
  const OnClick = () => {
    setClick((current) => !current);
  };
  const OnEnter = () => {
    console.log("enter");
  };
  const OnLeave = () => {
    console.log("stop");
  };
  const Idle = () => {
    return (
      <div className="w-64 h-44 flex justify-center align-middle items-center">
        <img
          src={props.data}
          onClick={OnClick}
          onMouseEnter={OnEnter}
          onMouseLeave={OnLeave}
          className="w-64 h-44"
        />
      </div>
    );
  };
  const Active = () => {
    return (
      <div className="w-64 h-44 flex justify-center align-middle items-center z-0">
        <div className="absolute w-64 h-44 z-10 bg-gray-800 opacity-50">hi</div>
        <img src={props.data} onClick={OnClick} className="w-64 h-44" />
      </div>
    );
  };

  return click ? <Active /> : <Idle />;
}
