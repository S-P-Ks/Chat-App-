let socket = io();

socket.on("connect", function () {
  console.log("Connected to the Server");

  socket.emit("createMessage", {
    from: "Shubham",
    text: "Whats going on man ...",
  });
});

socket.on("disconnect", function () {
  console.log("User disconnected");
});

socket.on("newMessage", function (message) {
  console.log("new Message ", message);
});
