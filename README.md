# Web2 advance - Mini Chatbot App solution

This is a solution to the [Mini Chatbot AI app]. Web 2 advance assignments help you improve your coding skills by building realistic projects.

## Table of contents

- [Web2 advance - Mini Chatbot AI solution] (#Web2 advance - Mini chatbot ai solution)
  - [Table of contents](#table-of-contents)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
  - [Acknowledgments](#acknowledgments)

### The challenge

Users should be able to:

- Change the theme of the App.
- Chat with the AI and get a response back.
- delete the message when you're done chatting

### Screenshot

![alt text](<Screenshot (83).png>)
Dark theme of the AI App.

![alt text](<Screenshot (84).png>)
Light Theme of the AI App.

![alt text](<Screenshot (85).png>)
AI and USER chat

### Links

- Solution URL: [(https://github.com/Techie-T/mini-AI.git)] (Github Repository)
- Live Site URL: [(https://dainty-melomakarona-04b87a.netlify.app/)] (Netlify)

## My process

Started with the html file and added the functionality, then the css and then got to the javascript section which was difficult but i was able to navigate through it with the help of some youtube videos and a few collegues.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- A lot of javascript

### What I learned

I learnt a lot on Javascript with the project showing how to use objects, arrays and API.

```html
<div class="typing-container">
  <div class="typing-content">
    <div class="typing-textarea">
      <textarea
        id="chat-input"
        placeholder="Enter prompt here"
        required
      ></textarea>
      <span id="send-btn" class="material-symbols-rounded">send</span>
    </div>
  </div>
</div>
```

```css
.typing-animation .typing-dot {
  height: 7px;
  width: 7px;
  background-color: var(--text-color);
  opacity: 0.7;
  border-radius: 50%;
  margin: 0 3px;
  animation: animateDots 1.5s var(--delay) ease-in-out infinite;
}
.typing-animation {
  display: inline-flex;
  padding-left: 25px;
}
@keyframes animateDots {
  0%,
  44% {
    transform: translateY(0px);
  }
  22% {
    opacity: 0.4;
    transform: translateY(-6px);
  }
  44% {
    opacity: 0.2;
  }
}
```

```js
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
```

### Continued development

I would like to improve my JS knowldege and advance more in the web-development space and get to use API's a lot.

## Acknowledgments

All thanks to the leaders of web3brigde for creating this wonderful expereience and all thanks to Jehovah for the grace to find the program no matter my location and thanks to a few collegues that helped when i got stuck.
