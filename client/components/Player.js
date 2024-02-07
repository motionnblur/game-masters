import React from "react";

export default function Player(props) {
  return (
    <video width={600} controls>
      <source src={props.src} type="video/webm" />
    </video>
  );
}
