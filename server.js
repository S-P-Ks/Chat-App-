const path = require("path");
const public = path.join(__dirname, "./public");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

io.on("connection", (socket) => {
  console.log("Connection established");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 3000 || process.env.PORT;

app.use(express.static(public));
server.listen(3000, () => {
  console.log("Logging into the server on port 3000");
});
