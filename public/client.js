const socket = io();
let name;
//for get textarea
let textarea = document.querySelector("#textarea");
// for import the message area
let messageArea = document.querySelector(".message__area");
// for join the chat
do {
  name = prompt("Please enter your name: ");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  //for checking the enter key
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

//for sending the message
function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };
  // Append message
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  // Send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  // create a new div for message
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
  // insert mainDiv into markup
  mainDiv.innerHTML = markup;
  // insert mainDiv into messageArea
  messageArea.appendChild(mainDiv);
}

// Recieve messages
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

//for scroll the message
function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
