"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Player from "../../../components/Player";

function extractStrings(input) {
  const regex = /^\/App\/upload-dir\/(.*?)\/(.*)$/;
  const match = input.match(regex);

  if (match) {
    const A = match[1];
    const B = match[2];

    return [A, B];
  }

  return [null, null];
}

export default function page() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/getAllVideos").then((res) => {
      if (!res.data[0]) return;
      setVideos(res.data);
      console.log(res.data);
      const [A, B] = extractStrings(res.data[0].filePath);
    });
  }, []);
  return (
    <>
      {videos.map((video) => {
        const [A, B] = extractStrings(video.filePath);

        return <Player src={`http://localhost:8081/getFile/${A}/${B}`} />;
      })}
    </>
  );
}
