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
  const [byte, setByte] = useState([]);

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
          setUserName(res.data);
        } else {
          alert("you are not allowed to see this page");
          router.push("/");
        }
      });
  }, []);

  useEffect(() => {
    if (userName) {
      axios
        .get("http://localhost:8080/api/getUploadTable", {
          params: {
            userName: userName,
          },
        })
        .then((res) => {
          const newVideos = res.data.map((item) => ({
            fileName: item.fileName,
          }));
          setVideos(newVideos);
        });
    }
  }, [userName]);

  useEffect(() => {
    videos.forEach((item) => {
      axios
        .get("http://localhost:8081/getVideoImg", {
          params: {
            fileName: item.fileName,
            userName: "can",
          },
        })
        .then((res) => {
          setByte((oldArr) => [...oldArr, "data:image/png;base64," + res.data]);
        });
    });
  }, [videos]);

  return (
    <div className="flex flex-col justify-center align-middle items-center">
      <b>{userName}</b>
      <br />
      <b>## your videos ##</b>

      {byte.map((data) => {
        return (
          <>
            <img src={data} width="500" height="500"></img>
          </>
        );
      })}
    </div>
  );
}
