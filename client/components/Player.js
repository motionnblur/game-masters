import React from "react";

export default function Player() {
  return (
    <video width={400} controls>
      <source src="http://localhost:8081/getFile/test.webm" type="video/webm" />
    </video>
  );
}
