"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Player from "../../../components/Player";

export default function page() {
  useEffect(() => {
    const fetchVideoData = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/getAllVideos"
      );
      console.log(response.data);
    };

    fetchVideoData();
  });
  return <Player />;
}
