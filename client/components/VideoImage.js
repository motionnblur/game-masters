import React, { useState } from "react";

export default function VideoImage(props) {
  const [showMenu, setShowMenu] = useState(false);

  const showImageMenu = () => {
    setShowMenu(true);
  };

  const hideImageMenu = () => {
    setShowMenu(false);
  };
  const ImageMenu = () => {
    return (
      <div className="w-full h-full">
        <div
          className="w-full h-full flex justify-center items-center"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 10,
          }}
          onMouseLeave={hideImageMenu}
        >
          <p class="text-1xl font-medium text-gray-900 dark:text-white">
            {props.video_name}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        key={props.index}
        src={props.data}
        style={{ width: "100%" }}
        onMouseEnter={showImageMenu}
      />
      {showMenu && <ImageMenu />}
    </div>
  );
}
