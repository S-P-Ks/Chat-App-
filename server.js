const path = require("path");
const public = path.join(__dirname, "./public");
const http = require("http");
const moment = require("moment");
const express = require("express");
const socketIO = require("socket.io");
const { isRealString } = require("./server/utils/isRealString");
const { Users } = require("./server/utils/users");

const {
  generateLocationMessage,
  generateMessage,
} = require("./server/utils/message");
const users = require("./server/utils/users");

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let us = new Users();

io.on("connection", (socket) => {
  console.log("Connection established");

  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the Chat App !!",
    time: moment().valueOf(),
  });

  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New User Joined the Chat",
    time: moment().valueOf(),
  });

  socket.on("join", (params, callback) => {
    console.log(params.name);
    console.log(params.room);
    if (!isRealString(params.name) || !isRealString(params.room)) {
      console.log(params[0]);
      console.log(params[1]);
      callback("Name and Rooms are Required");
    }

    console.log(socket.id);
    socket.join(params.room);

    us.removeUser(socket.id);
    us.addUser(socket.id, params.name, params.room);
    console.log(us.users);

    io.to(params.room).emit("updateUsersList", us.getUsersList(params.room));

    socket.emit(
      "newMessage",
      generateMessage("Admin", "Welcome to the Chat App")
    );

    socket.broadcast.emit(
      "newMessage",
      generateMessage("Admin", "New User Joined!")
    );

    callback();
  });

  socket.on("createMessage", (message, callback) => {
    console.log("Message Created", message);
    let user = us.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit(
        "newMessage",
        generateMessage(user.name, message.text)
      );
    }
  });

  socket.on("createLocationMessage", (coords) => {
    let user = us.getUser(socket.id);

    if (user && isRealString(coords.text)) {
      io.to(user.room).emit(
        "newLocationMessage",
        generateLocationMessage(user.name, coords.text)
      );
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");

    let user = us.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("updateUsersList", us.getUsersList(user.room));
      io.to(user.room).emit(
        "newMessage",
        generateMessage("Admin", `${us.name} has left the ${us.room}`)
      );
    }
  });
});

const PORT = 3000 || process.env.PORT;

app.use(express.static(public));
server.listen(3000, () => {
  console.log("Logging into the server on port 3000");
});
