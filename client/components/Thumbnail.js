import React, { useState } from "react";

export default function Thumbnail(props) {
  const [overlay, setOverlay] = useState(false);
  const OnEnterLeave = () => {
    setOverlay((current) => !current);
  };
  const OnVideoPlay = () => {
    props.userNameForVideo.current = props.userName;
    props.videNameForVideo.current = props.videoName;
    props.setShowVideo(true);
  };
  const Idle = () => {
    return (
      <div className="w-64 h-44 flex justify-center align-middle items-center m-2">
        <img
          src={props.data}
          onMouseEnter={OnEnterLeave}
          className="w-64 h-44"
        />
      </div>
    );
  };

  const Active = () => {
    return (
      <>
        <div className="w-64 h-44 flex justify-center align-middle items-center z-0 m-2">
          {overlay ? (
            <div
              className="absolute w-64 h-44 z-10 bg-black opacity-80 flex flex-col justify-center align-middle items-center"
              onMouseLeave={OnEnterLeave}
            >
              <div className="text-white"> Teacher: {props.userName} </div>
              <button onClick={OnVideoPlay}>
                <div className="text-white">Play</div>
              </button>
            </div>
          ) : (
            <></>
          )}
          <img src={props.data} className="w-64 h-44" />
        </div>
      </>
    );
  };

  return overlay ? <Active /> : <Idle />;
}
