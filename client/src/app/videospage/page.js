"use client";

import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/navigation";

const url = "http://localhost:8080/api/authenticate";

export default function page() {
  const router = useRouter();
  const [thumbnailData, setThumbnailData] = useState([]);
  const [imageData, setImageData] = useState([]);
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
  ////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const fetchAllThumbnailData = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/getAllThumbnails"
      );
      setThumbnailData(response.data);
      //console.log(response.data);
    };

    fetchAllThumbnailData();
  }, []);

  useEffect(() => {
    if (thumbnailData[0] == null) return;

    const fetchAllImageData = async () => {
      if (thumbnailData[0] == null) return;

      const newImageData = [];
      for (const thumb of thumbnailData) {
        console.log(thumb);
        const response = await axios.get("http://localhost:8081/getVideoImg", {
          params: {
            fileName: thumb.thumbnailName,
            userName: "can",
          },
        });
        const base64Data = "data:image/png;base64," + response.data;
        newImageData.push({
          fileName: thumb.thumbnailName,
          data: base64Data,
        });
      }
      setImageData(newImageData);
    };
    fetchAllImageData();
  }, [thumbnailData]);

  return (
    <>
      {imageData.map((image) => (
        <img src={image.data} width="300" height="300" />
      ))}
    </>
  );
}
