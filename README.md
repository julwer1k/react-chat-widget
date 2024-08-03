# Chat Popup

This project implements a pop-up chat window that can be integrated into any HTML page without compromising its functionality and appearance. It was developed using React, JavaScript, SCSS, and BIOM (Hooks).

## Features.

1. **Minimized state**: When minimized, the chat window looks like a button that is always fixed on the right side of the browser and placed above the page content.
2. **Open chat**: When you click on the button, the chat window opens with an animation. The window can be minimized again.
3. **Greeting**: A bubble with a greeting appears after the animation.
4. **Question**: A bubble with a question appears next: "How can I help you?".
5. **Answers**: Options for questions appear as separate bubbles:
   - "What day is it?"
   - "What time is it?"
   - "How many days until the New Year?"
   - "Your own question"
6. **Answers to questions**: If the user chooses one of the options 1-3, the chat automatically generates an answer. The "Typing..." animation appears before the answer is displayed.
7. **Add my own question**: If the user selects the "My question" option, an input field appears.
8. **Enter text**: In the input field, the user can enter their text and send it to the server (POST method). Processing on the server is not necessary, just sending it is enough.
9. **Acknowledgment**: After sending a chat, a bubble appears with a thank you message.

## Technology.
- **React**: To create an interface.
- JavaScript: For functional logic.
- SCSS: For styling.
- Hooks: For managing state and side effects.

## How to start a project
1. **Clone the repository**:

   ## bash
   git clone https://github.com/julwer1k/react-chat-widget.git

   npm install

   npm start dev
   ```
