const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
    return `
      <div class="mine messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${formattedTime}
        </div>
      </div>
    `;
  } else {
    return `
      <div class="yours messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${message.sender} ${formattedTime}
        </div>
      </div>
    `;
  }
}
function fetchMessages() {
  return [
    {
      id: 1,
      text: "This is my message",
      sender: "Abdoul Sow",
      timestamp: 1234567890513
    },
    {
      id: 2,
      text: "This is my message",
      sender: "Yahya Gilany",
      timestamp: 1537410673072
    },
    {
      id: 3,
      text: "This is my message",
      sender: "Steve Rogers",
      timestamp: 9876543216140
    }
  ];
}
function updateMessages() {
  const messages = fetchMessages();
  let formattedMessages = "";
  messages.forEach(message => {
    formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
}

updateMessages;

sendButton.addEventListener("click", function(event) {
  event.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;
  sendMessages(sender, message);
  myMessage.value = "";
});

const serverURL = `https://it3049c-chat.fly.dev/messages`;

function fetchMessages() {
  return fetch(serverURL)
    .then(response => response.json());
}

async function updateMessages() {
  const messages = await fetchMessages();
  // ...
}

const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

function sendMessages(username, text) {
  const newMessage = {
    sender: username,
    text: text,
    timestamp: new Date()
  };

  fetch(serverURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMessage)
  });
}