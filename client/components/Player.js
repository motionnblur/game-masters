import React from "react";

export default function Player() {
  return (
    <video width={400} controls>
      <source
        src="http://192.168.1.106:8081/getFile/test.webm"
        type="video/webm"
      />
    </video>
  );
}
