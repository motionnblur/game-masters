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
  const [uploadPercentage, setUploadPercentage] = useState(0);

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
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadPercentage(percentCompleted);
        },
      })
      .then((res) => {
        console.log(res.status);
      });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
        <br />
        <br />
        <progress value={uploadPercentage / 100} />
      </div>
    </div>
  );
}
