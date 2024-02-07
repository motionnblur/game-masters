"use client";

import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/navigation";

const url = "http://localhost:8080/api/authenticate";

export default function page() {
  const router = useRouter();
  const [thumbnailData, setThumbnailData] = useState([]);
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
    const fetchAllVideoImages = async () => {
      const newImageData = [];
      console.log(thumbnailData);
      for (const thumb of thumbnailData) {
        console.log(thumb.thumbnailName);
        const response = await axios.get("http://localhost:8081/getVideoImg", {
          params: {
            fileName: thumb.thumbnailName,
            userName: "Hasan",
          },
        });
        console.log(response.data);
      }
    };
    fetchAllVideoImages();
  }, [thumbnailData]);

  return <>test</>;
}
