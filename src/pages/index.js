/**
 * Main Application Component
 * Acts as the primary router and state manager for the application
 * 
 * @component App
 * @description Controls the main application flow and state management between HomePage and ChatPage
 */

// Import necessary dependencies
import React, { useState } from "react";
import "@/styles/index.css";
import HomePage from "./HomePage.js";
import ChatPage from "./ChatPage.js";

/**
 * App Component
 * @returns {JSX.Element} Renders either HomePage or ChatPage based on currentPage state
 * 
 * State Management:
 * - bot: Selected healthcare bot (Ava or Eli)
 * - currentPage: Controls which page is displayed ('home' or 'chat')
 * - chartingInfo: Stores medical charting information from conversations
 */
function App() {
  const [bot, setBot] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [chartingInfo, setChartingInfo] = useState([]);
  if (currentPage === "home") {
    return <HomePage setBot={setBot} setCurrentPage={setCurrentPage} />;
  } else if (currentPage === "chat") {
    return (
      <ChatPage
        bot={bot}
        setBot={setBot}
        setCurrentPage={setCurrentPage}
        setChartingInfo={setChartingInfo}
        chartingInfo={chartingInfo}
      />
    );
  }
}

export default App;
