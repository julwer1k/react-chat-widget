import { useEffect, useMemo, useRef, useState } from "react";
import { getSupportMessage } from "../../utils/getSupportMessage.js";
import { AnswerBlock } from "../AnswerBlock/index.js";
import { Loader } from "../Loader/Loader.jsx";
import { MessageBlock } from "../MessageBlock/index.js";
import "./Message.scss";

const ANSWERS = [
  { id: 0, text: "Який сьогодні день?" },
  { id: 1, text: "Яка зараз година?" },
  { id: 2, text: "Скільки днів до Нового Року?" },
  { id: 3, text: "Своє питання" },
];

export const IMG_URL =
  "https://6939709.fs1.hubspotusercontent-na1.net/hub/6939709/hubfs/Screenshot%202022-05-16%20at%2008.57.55-modified.png?width=108&height=108";

const INITIAL_STATE = {
  key: 0,
  person: {
    role: "support",
    name: "Jayne N",
    imgUrl: IMG_URL,
    message: [{ id: 0, text: "Чим я вам можу допомогти?" }],
    time: new Date().toISOString(),
  },
  type: "first-message",
};

export const Message = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectAnswer, setSelectAnswer] = useState(null);
  const [initialMessage, setInitialMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messageId, setMessageId] = useState(0);
  const [answers, setAnswers] = useState(ANSWERS);
  const messagesEndRef = useRef(null);

  const isWriteQuestion = useMemo(() => selectAnswer === 3, [selectAnswer]);

  useEffect(() => {
    if (inputValue.trim()) {
      const typingMessage = {
        person: {
          role: "user",
          name: "Jayne N",
          imgUrl: IMG_URL,
          message: [],
        },
        type: "type-message",
      };

      if (!messages.some((message) => message.type === "type-message")) {
        setMessages((prev) => [...prev, typingMessage]);
      }
    } else {
      setMessages((prev) =>
        prev.filter((message) => message.type !== "type-message"),
      );
    }
  }, [inputValue]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, answers]);

  const selectAnswers = (answerId) => {
    setAnswers([]);

    if (answerId === 3) {
      setMessageId((prev) => prev + 1);
      setSelectAnswer(answerId);
      return;
    }

    const newMessage = getSupportMessage(answerId, messageId);

    if (newMessage) {
      const typingMessage = {
        person: {
          role: "support",
          name: "Jayne N",
          imgUrl: IMG_URL,
          message: [],
        },
        type: "type-message",
      };

      setMessages((prev) => [...prev, typingMessage]);

      setTimeout(() => {
        setMessages((prev) => {
          prev.pop();
          return [...prev, newMessage];
        });
      }, 400);
    }

    setTimeout(() => {
      setAnswers(ANSWERS);
    }, 1000);

    setSelectAnswer(answerId);
  };

  const handeChangeInput = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setAnswers([]);
  };

  useEffect(() => {
    const fetchMessage = () => {
      setTimeout(() => {
        setInitialMessage(INITIAL_STATE);
        setIsLoading(false);
      }, 200);
    };

    fetchMessage();
  }, []);

  const submitInputValue = (event) => {
    event.preventDefault();

    const userInput = inputValue.trim();
    if (userInput) {
      fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      })
        .then(() => {})
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }

    const newMessage = {
      person: {
        role: "user",
        name: "Arthur",
        imgUrl: null,
        message: [{ id: messageId + 1, text: inputValue }],
      },
      type: "default-message",
    };

    const answerMessage = {
      person: {
        role: "support",
        name: "Jayne N",
        imgUrl: IMG_URL,
        message: [{ id: messageId + 3, text: "Дякую за вашу відповідь!" }],
      },
      type: "default-message",
    };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      setMessages((prev) => [...prev, answerMessage]);
    }, 400);

    setTimeout(() => {
      setAnswers(ANSWERS);
    }, 1000);

    setSelectAnswer(undefined);
    setInputValue("");
  };

  return (
    <>
      <div className="message-content message-content__container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <MessageBlock content={initialMessage} />

            {selectAnswer === null && (
              <div className="answers-content">
                {answers.map(({ id, text }) => (
                  <AnswerBlock
                    key={id}
                    id={id}
                    text={text}
                    selectAnswers={selectAnswers}
                  />
                ))}
              </div>
            )}

            {messages.map((message, index) => {
              if (message) {
                return <MessageBlock key={index} content={message} />;
              }
            })}

            {selectAnswer !== null && (
              <div className="answers-content">
                {answers.map(({ id, text }) => (
                  <AnswerBlock
                    key={id}
                    id={id}
                    text={text}
                    selectAnswers={selectAnswers}
                  />
                ))}
              </div>
            )}
          </>
        )}

        <div ref={messagesEndRef} />
      </div>

      {isWriteQuestion && (
        <form className="message-field" onSubmit={submitInputValue}>
          <input
            value={inputValue}
            onChange={handeChangeInput}
            type="text"
            className="message-field__text"
            placeholder="Write a message"
          />

          <button
            type="submit"
            className="message-field__button"
            disabled={!inputValue.trim()}
          >
            <svg
              className="feather feather-send message-field__button-icon"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="22" x2="11" y1="2" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      )}
    </>
  );
};
