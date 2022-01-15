const chatForm = document.getElementById("chatForm");
const socket = io();

// Get username from URL
const { userName } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = e.target.elements.messageText;

  // Emitting a message to the server
  socket.emit("chatMessage", userName, input.value);
  input.value = "";
  input.focus();
});

// Output message to DOM
function outputMessage({ userName, text, time }) {
  const div = document.createElement("div");
  div.classList.add("message");

  div.innerHTML = `
  <p class="meta">${userName} <span class="time">${time}</span></p>
  <div class="messageText">${text}</div>
  `;
  const messages = document.querySelector(".messages");
  messages.appendChild(div);
  messages.scrollTo(0, messages.scrollHeight);
}
