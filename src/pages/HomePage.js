import React from "react";
import "@/styles/home.css";

function HomePage({ setBot, setCurrentPage }) {
  return (
    <div className="container" style={{ alignItems: "center" }}>
      <div className="home-container">
        <div className="text">
          <h1>
            Welcome to <span>HealthSync!</span>
          </h1>
          <p>Who would you like to chat with today?</p>
          <div className="buttons">
            <button
              onClick={() => {
                setBot("Ava");
                setCurrentPage("chat");
              }}
            >
              Ava
            </button>
            <button
              onClick={() => {
                setBot("Eli");
                setCurrentPage("chat");
              }}
            >
              Eli
            </button>
          </div>
        </div>
        <img src="/assets/logo.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
