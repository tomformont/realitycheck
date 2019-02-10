const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

io.on("connection", socket => {
  console.log("Nouvelle connexion");
  socket.on("chat message", msg => {
  io.emit("chat message", msg);
  });

  socket.on("new picture", newP => {
  io.emit("new picture", newP);
  console.log(newP);
  });

});

server.listen(port), () => console.log("server running on port:" + port);
