//
const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");
const initialHeight = chatInput.scrollHeight;

let userText = "null";

// ADD an API_KEY
const API_KEY = "AIzaSyA_31TKJchNO_TkKty1xHHJuelqe-eWLtQ";

// Get data from local storage
const loadDataFromLocalstorage = () => {
  const themeColor = localStorage.getItem("theme-color");

  document.body.classList.toggle("light-mode", themeColor === "light_mode");
  themeButton.innerText = document.body.classList.contains("light-mode")
    ? "dark_mode"
    : "light_mode";

  const defaultText = `
    <div class="default-text">
      <h1>ChatGPT Clone</h1>
      <p>Start a conversation and explore the power of AI. <br> Your chat history will be displayed here.</p>
    </div>
  `;

  chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

loadDataFromLocalstorage();

const createElement = (html, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = html;
  return chatDiv;
};

// Get chat response from the API
const getChatResponse = async (incomingChatDiv) => {
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  const pElement = document.createElement("p");

  // Build the request body for the API
  const requestBody = {
    contents: [
      {
        parts: [{ text: userText }],
      },
    ],
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error.message);
    }

    // Get the generated text from the API response
    const responseText = data.generatedText || "How are you?";

    pElement.textContent = responseText.trim();
  } catch (error) {
    pElement.classList.add("error");
    pElement.textContent =
      "Oops! Something went wrong while retrieving the response, please try again.";
    console.error(error); // Log the error for debugging purposes
  }

  // Remove the typing animation once response is received
  incomingChatDiv.querySelector(".typing-animation").remove();
  incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  // Save the updated chat to local storage
  localStorage.setItem("all-chats", chatContainer.innerHTML);
};

// Show typing animation
const showTypingAnimation = () => {
  const html = `
    <div class="chat-content">
      <div class="chat-details">
        <img src="img/cahtgpt.avif" alt="Chatbot Image" />
        <div class="typing-animation">
          <div class="typing-dot" style="--delay: 0.2s"></div>
          <div class="typing-dot" style="--delay: 0.3s"></div>
          <div class="typing-dot" style="--delay: 0.4s"></div>
        </div>
      </div>
      <span onclick="copyResponse(this)" class="material-symbols-rounded"> content_copy </span>
    </div>
  `;
  const incomingChatDiv = createElement(html, "incoming");
  chatContainer.appendChild(incomingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  // Wait a moment before triggering the API call
  setTimeout(() => getChatResponse(incomingChatDiv), 500);
};

// Handle outgoing chat message
const handleOutgoingChat = () => {
  userText = chatInput.value.trim();
  if (!userText) return;

  const html = `<div class="chat-content">
          <div class="chat-details">
            <img src="img/user.avif" alt="User Image" />
            <p>${userText}</p>
          </div>
        </div> `;
  const outgoingChatDiv = createElement(html, "outgoing");
  chatContainer.appendChild(outgoingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  // Remove default text after user starts chatting
  document.querySelector(".default-text")?.remove();

  setTimeout(showTypingAnimation, 500);
};

// Change theme when the theme button is clicked
themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme-color", themeButton.innerText);
  themeButton.innerText = document.body.classList.contains("light-mode")
    ? "dark_mode"
    : "light_mode";
});

// Delete all chat history when the delete button is clicked
deleteButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all the chats?")) {
    localStorage.removeItem("all-chats");
    loadDataFromLocalstorage();
  }
});

// Adjust textarea size dynamically as the user types
chatInput.addEventListener("input", () => {
  chatInput.style.height = `${initialHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

sendButton.addEventListener("click", handleOutgoingChat);
