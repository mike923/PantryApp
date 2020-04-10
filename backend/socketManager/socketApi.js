const socket_io = require("socket.io");
const io = socket_io();
const socketApi = {};

socketApi.io = io;

io.on("connection", (socket) => {
  console.log("a user is connected", socket.id);

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

socketApi.sendNotification = function () {
  io.sockets.emit("hello", { msg: "Hello World!" });
};

module.exports = socketApi;
