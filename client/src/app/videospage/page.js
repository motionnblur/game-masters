"use client";

import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/navigation";
import Player from "../../../components/Player";

const url = "http://localhost:8080/api/authenticate";

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
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axios
      .post(
        url,
        {
          cookieData: getCookie("user-id"),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data) {
          //setUserName(res.data);
        } else {
          alert("You are not allowed to see this page");
          router.push("/");
        }
      });
  }, []);
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
