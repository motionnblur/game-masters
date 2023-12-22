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
      <div className="w-full h-full" onMouseLeave={hideImageMenu}>
        <div
          className="w-full h-full flex flex-col justify-center items-center"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 10,
          }}
        >
          <p class="text-1xl font-medium text-gray-900 dark:text-white">
            {props.video_name}
          </p>
          <div className="flex flex-row justify-center items-center gap-2">
            <button
              type="button"
              class="text-gray-900 bg-white border 
            border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 
            focus:ring-gray-200 font-medium rounded-full text-sm px-4 py-2
             dark:bg-gray-800 dark:text-white dark:border-gray-600 
             dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700
              cursor-pointer mt-20"
            >
              Play
            </button>
            <button
              type="button"
              class="text-gray-900 bg-white border 
            border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 
            focus:ring-gray-200 font-medium rounded-full text-sm px-4 py-2
             dark:bg-gray-800 dark:text-white dark:border-gray-600 
             dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700
              cursor-pointer mt-20"
            >
              Change Thumblnail
            </button>
          </div>
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
