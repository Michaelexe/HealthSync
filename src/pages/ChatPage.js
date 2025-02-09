import React, { useEffect, useState } from "react";
import "@/styles/chat.css";
import Charting from "./Charting";

function ChatPage({
  bot,
  setBot,
  setCurrentPage,
  chartingInfo,
  setChartingInfo,
}) {
  const inputRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState([
    "bot: Hello! How can I help you today?",
  ]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        inputRef.current.value = transcript;
      };

      setRecognition(recognition);
    }
  }, []);

  const handleVoiceStart = () => {
    if (recognition && !isListening) {
      recognition.start();
    } else if (recognition && isListening) {
      recognition.stop();
    }
  };

  useEffect(() => {
    if (messages.length > 1 && loading) {
      fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationHistory: messages,
        }),
      })
        .then(async (response) => {
          const data = await response.json();
          setChartingInfo([...chartingInfo, data.charting_information]);
          setMessages([...messages, `bot: ${data.next_question}`]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [messages]);
  return (
    <div className="container">
      <div className="chat-container">
        <div className="chat-header">
          <svg
            onClick={() => {
              setBot("");
            }}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g data-name="arrow left" id="arrow_left">
                <path
                  class="cls-1"
                  d="M22,29.73a1,1,0,0,1-.71-.29L9.93,18.12a3,3,0,0,1,0-4.24L21.24,2.56A1,1,0,1,1,22.66,4L11.34,15.29a1,1,0,0,0,0,1.42L22.66,28a1,1,0,0,1,0,1.42A1,1,0,0,1,22,29.73Z"
                ></path>
              </g>
            </g>
          </svg>
          <h1>Chatting with {bot}</h1>
          <button
            onClick={() => {
              setCurrentPage("charting");
            }}
          >
            Done
          </button>
        </div>
        <div className="chat-box">
          {messages.map((message, index) => {
            if (message.slice(0, 3) === "bot") {
              return (
                <div className="chat-message">
                  <p>{message.slice(5)}</p>
                </div>
              );
            } else {
              return (
                <div className="chat-message chat-message--user">
                  <p>{message}</p>
                </div>
              );
            }
          })}
        </div>
        <div className="chat-input">
          <button 
            className={`voice-button ${isListening ? 'listening' : ''}`}
            onClick={handleVoiceStart}
          >
            <svg
              className="mic-icon"
              fill="#000000"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              enable-background="new 0 0 512 512"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <g>
                    <path d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z"></path>{" "}
                    <path d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z"></path>{" "}
                  </g>
                </g>
              </g>
            </svg>
            <div className="voice-visualization">
              {isListening && Array(4).fill(0).map((_, i) => (
                <div key={i} className="voice-bar"></div>
              ))}
            </div>
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setMessages([...messages, inputRef.current.value]);
                inputRef.current.value = "";
                setLoading(true);
              }
            }}
          />
          <button
            onClick={() => {
              if (inputRef.current.value) {
                setMessages([...messages, inputRef.current.value]);
                inputRef.current.value = "";
                setLoading(true);
              }
            }}
          >
            Send
          </button>
        </div>
      </div>
      <Charting chartingInfo={chartingInfo} />
    </div>
  );
}

export default ChatPage;
