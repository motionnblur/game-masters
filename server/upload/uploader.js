const http = require("http");
const fs = require("fs");
const httpServer = http.createServer();

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
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET", "POST");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, file-name"
    );
    const fileName = req.headers["file-name"];

    req.on("data", (chunk) => {
      fs.appendFileSync(fileName, chunk);
    });

    res.end("uploaded!");
  }
});

httpServer.listen(8081);
