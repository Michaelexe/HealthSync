import React, { useState } from "react";
import "@/styles/index.css";
import HomePage from "./HomePage.js";
import ChatPage from "./ChatPage.js";

function App() {
  const [bot, setBot] = useState(null);
  if (!bot) {
    return <HomePage setBot={setBot} />;
  } else {
    return <ChatPage bot={bot} setBot={setBot} />;
  }
}

export default App;
