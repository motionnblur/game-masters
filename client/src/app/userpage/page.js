"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { isVideoFile } from "../../../api/Regex";

export default function page() {
  const router = useRouter();
  const url = "http://localhost:8080/api/authenticate";
  const [userName, setUserName] = useState("");

  const [file, setFile] = useState();
  const [getTable, setGetTable] = useState(false);
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
        console.log(res.data);
        if (res.data) {
          setUserName(res.data);
        } else {
          alert("you are not allowed to see this page");
          router.push("/");
        }
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userName", userName);

    if (!isVideoFile(file.name)) {
      console.log("it's not a video file");
      //return;
    }

    axios
      .post("http://localhost:8081/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.status);
      });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const getUploadTable = () => {
    if (videos.length > 0) setVideos([]);
    setGetTable(!getTable);
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
  };

  return (
    <div className="w-full h-full bg-slate-800 flex">
      <div className="m-2 w-full bg-slate-400 flex items-center flex-col">
        <div className="w-full h-14 bg-slate-300 flex items-center justify-center">
          <b>{userName}</b>
        </div>
        <>
          <form onSubmit={handleSubmit}>
            <input type="file" name="file" onChange={handleFileChange} />
            <input type="submit" value="Upload" />
          </form>
        </>
        <button onClick={getUploadTable}>Click to see your videos</button>
        {getTable &&
          videos.map((item) => (
            <>
              File name: {item.fileName}, path: {item.filePath} <br />
            </>
          ))}
      </div>
    </div>
  );
}
