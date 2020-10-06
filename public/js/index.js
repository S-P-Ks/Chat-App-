let socket = io();

socket.on("connect", function () {
  let param = window.location.search.substring(1);

  let ans = decodeURI(param)
    .replace(/&/g, '","')
    .replace(/\+/g, " ")
    .replace(/=/g, '":"');

  let obj = JSON.parse('{ "' + ans + '" }');
  console.log(obj);
  socket.emit("join", obj, function (error) {
    if (error) {
      alert(error);
      window.location.href = "/";
    } else {
      console.log("No Error");
    }
  });
});

socket.on("disconnect", function () {
  console.log("User disconnected");
});

socket.on("updateUsersList", function (users) {
  // console.log(message);

  let ol = document.createElement("ol");
  users.forEach((user) => {
    let li = document.createElement("li");
    li.innerHTML = user;
    ol.appendChild(li);
  });

  let usersList = document.querySelector(".members");

  usersList.innerHTML = "";
  usersList.appendChild(ol);
});

socket.on("newMessage", function (message) {
  const formatedTime = moment(message.createdAt).format("LT");
  const template = document.getElementById("message-template").innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formatedTime,
  });

  const div = document.createElement("div");
  div.innerHTML = html;

  document.querySelector(".chat-body").appendChild(div);
  // console.log("new Message ", message);
  // const formatedTime = moment(message.createdAt).format("LT");
  // let li = document.createElement("li");
  // li.innerText = `${message.from} : ${formatedTime} : ${message.text}`;
  // document.querySelector(".chat-body").appendChild(li);
});

socket.on("newLocationMessage", function (message) {
  console.log(message);
  const formatedTime = moment(message.createdAt).format("LT");
  const template = document.getElementById("loation-message-template")
    .innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formatedTime,
  });

  const div = document.createElement("div");
  div.innerHTML = html;

  document.querySelector(".chat-body").appendChild(div);

  // let li = document.createElement("li");
  // let a = document.createElement("a");
  // li.innerText = `${message.from} : ${formatedTime} `;
  // a.setAttribute("target", "__blank");
  // a.setAttribute("href", message.url);
  // a.innerText = "My Current Location";
  // li.appendChild(a);
});

document.getElementById("submit-btn").addEventListener("click", (e) => {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: document.querySelector('input[name = "message"]').value,
    },
    function () {}
  );
});

document
  .getElementById("send-location")
  .addEventListener("click", function (e) {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported by your Browser..");
    }

    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
        socket.emit("createLocationMessage", {
          lat: position.coords.latitude,
          lag: position.coords.longitude,
        });
      },
      function () {
        alert("Unable to detch the Position");
      }
    );
  });
