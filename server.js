const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

// Run when a client connects

io.on("connection", (socket) => {
  // Welcome new user
  socket.emit("message", "Welcome to Chat");

  // Broadcast to everyone else when user connects
  socket.broadcast.emit("message", "User has joined the chat");

  // Runs when user disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });

  // Listen for chat message
  socket.on("chatMessage", (message) => {
    io.emit("message", message);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
