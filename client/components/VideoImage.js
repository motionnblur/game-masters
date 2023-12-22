import React from "react";

export default function VideoImage(props) {
  return (
    <>
      <img
        key={props.index}
        src={props.data}
        style={{ width: "100%", marginBottom: "0.5rem" }}
      />
    </>
  );
}
