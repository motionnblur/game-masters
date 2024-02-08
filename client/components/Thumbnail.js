import React, { useState } from "react";

export default function Thumbnail(props) {
  const [click, setClick] = useState(false);
  const OnClick = () => {
    setClick((current) => !current);
  };
  const Idle = () => {
    return <img src={props.data} width="300" height="300" onClick={OnClick} />;
  };
  const Active = () => {
    return <img src={props.data} width="500" height="500" onClick={OnClick} />;
  };

  {
  }
  return click ? <Active /> : <Idle />;
}
