"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import VideoImage from "../../../components/VideoImage";

const url = "http://localhost:8080/api/authenticate";

export default function Page() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [videos, setVideos] = useState([]);
  const [videoData, setVideoData] = useState([]);

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
          alert("You are not allowed to see this page");
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
    const fetchVideoData = async () => {
      const newVideoData = [];
      for (const video of videos) {
        const response = await axios.get("http://localhost:8081/getVideoImg", {
          params: {
            fileName: video.fileName,
            userName: "can",
          },
        });
        const base64Data = "data:image/png;base64," + response.data;
        newVideoData.push({
          fileName: video.fileName,
          data: base64Data,
        });
      }
      setVideoData(newVideoData);
    };

    if (videos.length > 0) {
      fetchVideoData();
    }
  }, [videos]);

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="w-full h-full bg-slate-800 flex overflow-hidden">
      <div className="flex flex-col align-middle items-center w-full h-full mt-3 mb-3">
        <b>{userName}</b>
        <br />
        <b>## your videos ##</b>
        <div
          className="flex flex-col mt-4"
          style={{ height: "80%", width: "500px", overflowY: "scroll" }}
        >
          {videoData.map((video, index) => (
            <VideoImage
              key={index}
              data={video.data}
              index={index}
              video_name={truncateString(video.fileName, 50)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
