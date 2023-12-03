"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const url = "http://localhost:8080/api/authenticate";

export default function page() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    //setUserName(getCookie("user-id"));
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
          setUserName(res.data);
        } else {
          alert("you are not allowed to see this page");
          router.push("/");
        }
      });

    if (videos.length > 0) setVideos([]);
    axios
      .get("http://localhost:8080/api/getUploadTable", {
        params: {
          userName: userName,
        },
      })
      .then((res) => {
        res.data.forEach((item) => {
          setVideos((videos) => [
            ...videos,
            {
              fileName: item.fileName,
              filePath: item.filePath,
            },
          ]);
        });
      });
  }, [userName]);

  return (
    <div className="flex flex-col justify-center align-middle items-center">
      <b>{userName}</b>
      <br />
      <b>## your videos ##</b>
      {videos.map((item) => (
        <>
          File name: {item.fileName}, path: {item.filePath} <br />
        </>
      ))}
    </div>
  );
}
