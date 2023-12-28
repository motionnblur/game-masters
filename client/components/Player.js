import React from "react";
import ReactPlayer from "react-player";

export default function Player() {
  return (
    <ReactPlayer
      url="http://localhost:8081/video"
      config={{
        file: {
          attributes: {
            crossOrigin: "true",
          },
        },
      }}
      controls
    />
  );
}
