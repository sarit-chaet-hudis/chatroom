const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const { formatMessage } = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

const bot = "ChatBot";

// Run when a client connects

io.on("connection", (socket) => {
  // Welcome new user
  socket.emit("message", formatMessage(bot, "Welcome to Chat"));

  // Broadcast to everyone else when user connects
  socket.broadcast.emit(
    "message",
    formatMessage(bot, "User has joined the chat")
  );

  // Runs when user disconnects
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(bot, "A user has left the chat"));
  });

  // Listen for chat message
  socket.on("chatMessage", (userName, message) => {
    io.emit("message", formatMessage(userName, message));
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
