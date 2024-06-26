"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Thumbnail from "../../../components/Thumbnail";
import Player from "../../../components/Player";
import { useSelector } from "react-redux";
import UsernameComp from "../../../components/UsernameComp";

export default function page() {
  const currentUserLoginState = useSelector(
    (state) => state.userloginstate.value
  );

  const router = useRouter();
  if (currentUserLoginState == false) {
    router.push("/"); // problem here
  }

  const [thumbnailData, setThumbnailData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [showVideo, setShowVideo] = useState(false);

  const userNameForVideo = useRef("");
  const videNameForVideo = useRef("");

  ////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const fetchAllThumbnailData = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/getAllThumbnails"
      );
      setThumbnailData(response.data);
    };

    fetchAllThumbnailData();
  }, []);

  useEffect(() => {
    if (thumbnailData[0] == null) return;

    const fetchAllImageData = async () => {
      if (thumbnailData[0] == null) return;

      const newImageData = [];
      for (const thumb of thumbnailData) {
        //console.log(thumb.userName, thumb.thumbnailName);
        const response = await axios.get("http://localhost:8081/getVideoImg", {
          params: {
            fileName: thumb.thumbnailName,
            userName: thumb.userName,
          },
        });
        const base64Data = "data:image/png;base64," + response.data;
        newImageData.push({
          fileName: thumb.thumbnailName,
          userName: thumb.userName,
          data: base64Data,
        });
      }
      setImageData(newImageData);
    };
    fetchAllImageData();
  }, [thumbnailData]);

  return (
    <div className="m-2 w-full bg-slate-400 flex items-center flex-col">
      <UsernameComp />
      {imageData.map((image) => (
        <Thumbnail
          data={image.data}
          userName={image.userName}
          videoName={image.fileName}
          setShowVideo={setShowVideo}
          userNameForVideo={userNameForVideo}
          videNameForVideo={videNameForVideo}
        />
      ))}
      {showVideo ? (
        <div
          className="absolute top-0 w-full h-full z-10 flex justify-center align-middle items-center bg-black"
          onClick={() => setShowVideo(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Player
              src={`http://localhost:8081/getFile/${userNameForVideo.current}/${videNameForVideo.current}`}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
