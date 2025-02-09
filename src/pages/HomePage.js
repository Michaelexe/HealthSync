import React from "react";
import "@/styles/home.css";

function HomePage() {
  return (
    <div className="container">
      <div className="home-container">
        <div className="text">
          <h1>
            Welcome to <span>HealthSync!</span>
          </h1>
          <p>Who would you like to chat with today?</p>
          <div className="buttons">
            <button>Ava</button>
            <button>Eli</button>
          </div>
        </div>
        <img src="/assets/logo.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
