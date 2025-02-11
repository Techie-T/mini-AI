//
const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");
const initialHeight = chatInput.scrollHeight;
let userText = null;

//ADD an API_KEY
const API_KEY = "AIzaSyDiwziUd6qusSK6mQIt48huSR1L1AyXOi8";

//get data from local storage
const loadDataFromLocalstorage = () => {
  const themeColor = localStorage.getItem("theme-color");

  document.body.classList.toggle("light-mode", themeColor === "light_mode");

  themeButton.innerText = document.body.classList.contains("light-mode")
    ? "dark_mode"
    : "light_mode";

  const defaultText = `<div class="default-text">
                        <h1>ChatGPT Clone</h1>
                        <p>Start a conversation and explore the power of AI. <br> Your chat history will be displayed here.</p>
                    </div>`;

  chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

loadDataFromLocalstorage();

//CREATE ELEMENT
const createElement = (html, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = html;
  return chatDiv;
};

//get chat response
const getChatResponse = async (incomingChatDiv) => {
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  const pElement = document.createElement("p");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: userText.message }],
        },
      ],
    }),
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);
    console.log(data);
    //pElement.textContent = response.choices[0].text.trim();
  } catch (error) {
    console.log(error);
    //pElement.classList.add("error");
    //pElement.textContent =
    //"Oops! Something went wrong while retrieving the response, please try again";
  }

  //remove typing animation when text is dropped
  incomingChatDiv.querySelector(".typing-animation").remove();
  incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  //save to local storage
  localStorage.setItem("all-chats", chatContainer.innerHTML);
};

//SHOW TYPING ANIMATION
const copyResponse = (copyBtn) => {
  const responseTextElement = copyBtn.parentElement.querySelector("p");

  //copy response
  navigator.clipboard.writeText(responseTextElement.textContent);
  copyBtn.textContent = "done";
  setTimeout(() => (copyBtn.textContent = "content_copy"), 1000);
};

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
          <span onclick="copyResponse(this)" class="material-symbols-rounded"> content_copy </span>
        </div>`;
  const incomingChatDiv = createElement(html, "incoming");
  chatContainer.appendChild(incomingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  getChatResponse(incomingChatDiv);
};

//HANDLE OUTGOING CHAT
const handleOutgoingChat = () => {
  userText = chatInput.value.trim();
  if (!userText) return;

  const html = `<div class="chat-content">
          <div class="chat-details">
            <img src="img/user.avif" alt="User Image" />
            <p>
              
            </p>
          </div>
        </div>`;
  const outgoingChatDiv = createElement(html, "outgoing");
  outgoingChatDiv.querySelector("p").textContent = userText;

  document.querySelector(".default-text")?.remove();
  chatContainer.appendChild(outgoingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  setTimeout(showTypingAnimation, 500);
};

//ADD EVENTLISTENER TO BUTTON TO CHANGE THEME
themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme-color", themeButton.innerText);
  themeButton.innerText = document.body.classList.contains("light-mode")
    ? "dark_mode"
    : "light_mode";
});

//ADD EVENTLISTENER TO BUTTON TO DELETE CHAT
deleteButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all the chats?")) {
    localStorage.removeItem("all-chats");
    loadDataFromLocalstorage();
  }
});

//ADD EVENTLISTENER TO BUTTON TO ADJUST TEXTAREA
chatInput.addEventListener("input", () => {
  chatInput.style.height = `${initialHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

sendButton.addEventListener("click", handleOutgoingChat);
