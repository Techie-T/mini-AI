//
const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");

let userText = null;
const API_KEY = "";
//CREATE ELEMENT
const createElement = (html, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = html;
  return chatDiv;
};

const getChatRepsonse = async () => {
  const API_URL = "https://api.openai.com/v1/completions";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: userText,
      max_tokens: 2048,
      temperature: 0.2,
      n: 1,
      stop: null,
    }),
  };

  try {
    const response = await (await fetch(API_URL, requestOptions)).json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
//SHOW TYPING ANIMATION
const showTypingAnimation = () => {
  const html = `<div class="chat-content">
          <div class="chat-details">
            <img src="img/cahtgpt.avif" alt="Chatbot Image" />
            <div class="typing-animation">
              <div class="typing-dot" style="--delay: 0.2s"></div>
              <div class="typing-dot" style="--delay: 0.3s"></div>
              <div class="typing-dot" style="--delay: 0.4s"></div>
            </div>
          </div>
          <span class="material-symbols-rounded"> content_copy </span>
        </div>`;
  const outgoingChatDiv = createElement(html, "incoming");
  chatContainer.appendChild(outgoingChatDiv);

  getChatRepsonse();
};

//HANDLE OUTGOING CHAT
const handleOutgoingChat = () => {
  userText = chatInput.value.trim();
  const html = `<div class="chat-content">
          <div class="chat-details">
            <img src="img/user.avif" alt="User Image" />
            <p>
              ${userText}
            </p>
          </div>
        </div>`;
  const outgoingChatDiv = createElement(html, "outgoing");
  chatContainer.appendChild(outgoingChatDiv);
  setTimeout(showTypingAnimation, 500);
};

sendButton.addEventListener("click", handleOutgoingChat);
