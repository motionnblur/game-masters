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
      <img
        src={props.data}
        width="300"
        height="300"
        onClick={OnClick}
        onMouseEnter={OnEnter}
        onMouseLeave={OnLeave}
      />
    );
  };
  const Active = () => {
    return (
      <>
        hi
        <img src={props.data} width="300" height="300" onClick={OnClick} />
      </>
    );
  };

  return click ? <Active /> : <Idle />;
}
