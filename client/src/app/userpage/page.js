"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function page() {
  const crypto = require("crypto");
  const router = useRouter();
  const url = "http://localhost:8080/api/authenticate";
  const [userName, setUserName] = useState("");
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
  return (
    <div className="w-full h-full bg-slate-800 flex">
      <div className="m-2 w-full bg-slate-400 flex items-center flex-col">
        <div className="w-full h-14 bg-slate-300 flex items-center justify-center">
          <b>{userName}</b>
        </div>
        <div>
          You have <b>0</b> videos, do you want to upload ?
          <br />
          <br />
          File: <input type="file" id="f" />
          <button
            onClick={() => {
              const fileReader = new FileReader();
              const theFile = f.files[0];
              const hashAlgo = crypto.createHash("sha256");

              fileReader.onload = async (ev) => {
                const CHUNK_SIZE = 5000;
                const chunkCount = ev.target.result.byteLength / CHUNK_SIZE;
                console.log("Read successfully");
                const fileName = Math.random() * 1000 + theFile.name;

                if (typeof fileName === "undefined") {
                  throw new TypeError(
                    'The "fileName" variable must be of type string.'
                  );
                }

                hashAlgo.update(theFile);
                const hash = hashAlgo.digest("hex");

                for (let chunkId = 0; chunkId < chunkCount + 1; chunkId++) {
                  const chunk = ev.target.result.slice(
                    chunkId * CHUNK_SIZE,
                    chunkId * CHUNK_SIZE + CHUNK_SIZE
                  );
                  await fetch("http://localhost:8081/api/upload", {
                    method: "POST",
                    headers: {
                      "content-type": "application/octet-stream",
                      "content-length": chunk.length,
                      "file-name": fileName,
                      hash: hash,
                    },
                    body: chunk,
                  });
                }
              };
              fileReader.readAsArrayBuffer(theFile);
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
