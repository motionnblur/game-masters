const http = require("http");
const fs = require("fs");
const httpServer = http.createServer();
var hash = "";
const crypto = require("crypto");

httpServer.on("listening", () => console.log("Listening..."));
httpServer.on("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET", "POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, file-name"
  );

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
  }

  if (req.method === "POST" && req.url === "/api/upload") {
    const fileName = req.headers["file-name"];
    //hash = req.headers["hash"];
    console.log(hash);

    req.on("data", (chunk) => {
      fs.appendFileSync("/media/chill/D/game-masters/users/" + fileName, chunk);
    });

    res.end("uploaded!");
  }

  if (req.method === "POST" && req.url === "/api/uploaded") {
    req.on("data", (hash) => {
      const buffer = Buffer.from(hash);
      const stringBuf = buffer.toString();
      console.log(stringBuf);
    });
    res.end("ok");
  }
});

httpServer.listen(8081);
