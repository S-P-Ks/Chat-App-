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

  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the Chat App !!",
    time: new Date().getTime(),
  });

  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New User Joined the Chat",
    time: new Date().getTime(),
  });

  socket.on("createMessage", (message) => {
    console.log("Message Created", message);

    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      time: new Date().getTime(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 3000 || process.env.PORT;

app.use(express.static(public));
server.listen(3000, () => {
  console.log("Logging into the server on port 3000");
});
