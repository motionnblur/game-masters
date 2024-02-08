import React, { useState } from "react";

export default function Thumbnail(props) {
  const [click, setClick] = useState(false);
  const OnClick = () => {
    setClick((current) => !current);
  };
  const OnEnter = () => {
    setClick((current) => !current);
  };
  const OnLeave = () => {
    setClick((current) => !current);
  };
  const Idle = () => {
    return (
      <div className="w-64 h-44 flex justify-center align-middle items-center">
        <img src={props.data} onMouseEnter={OnEnter} className="w-64 h-44" />
      </div>
    );
  };
  const Active = () => {
    return (
      <div className="w-64 h-44 flex justify-center align-middle items-center z-0">
        {click ? (
          <div
            className="absolute w-64 h-44 z-10 bg-black opacity-80"
            onMouseLeave={OnLeave}
          >
            hi
          </div>
        ) : (
          <></>
        )}
        <img src={props.data} onClick={OnClick} className="w-64 h-44" />
      </div>
    );
  };

  return click ? <Active /> : <Idle />;
}
