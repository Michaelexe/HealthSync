import React, { useState } from "react";
import "@/styles/index.css";
import HomePage from "./HomePage.js";
import ChatPage from "./ChatPage.js";

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
