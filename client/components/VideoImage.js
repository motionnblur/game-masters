import React, { useState } from "react";

const truncateString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  } else {
    return str;
  }
};
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
      <>
        <div
          className="absolute inset-0 flex flex-col justify-center items-center bg-opacity-70 bg-gray-900 text-white"
          onMouseLeave={hideImageMenu}
        >
          <div className="h-1/2 mt-4 ml-4 mr-4">
            <p className="text-1xl font-medium text-white dark:text-white">
              {truncateString(props.video_name, 50)}
            </p>
          </div>

          <div className="flex flex-row justify-center items-center gap-2 h-1/2 mb-4">
            <button
              type="button"
              className="text-gray-900 bg-white border 
            border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 
            focus:ring-gray-200 font-medium rounded-full text-sm px-4 py-2
            dark:bg-gray-800 dark:text-white dark:border-gray-600 
            dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700
            cursor-pointer mt-20"
              onClick={() => {
                props.setShowVideo(true);
                props.setVideoName(props.video_name);
              }}
            >
              Play
            </button>
          </div>
        </div>
      </>
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
      {showMenu && (
        <div className="absolute inset-0">
          <ImageMenu />
        </div>
      )}
    </div>
  );
}
