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
          className="w-60 h-40"
        />
      </div>
    );
  };
  const Active = () => {
    return (
      <div className="w-64 h-44 flex justify-center align-middle items-center">
        hi
        <img src={props.data} width="300" height="300" onClick={OnClick} />
      </div>
    );
  };

  return click ? <Active /> : <Idle />;
}
