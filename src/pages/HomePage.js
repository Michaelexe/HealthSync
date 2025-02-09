/**
 * HomePage Component
 * Landing page for the HealthSync application
 * 
 * @component HomePage
 * @param {Object} props Component properties
 * @param {Function} props.setBot Function to select the AI healthcare provider
 * @param {Function} props.setCurrentPage Function to handle page navigation
 */

// Import dependencies
import React from "react";
import "@/styles/home.css";

/**
 * HomePage Component Implementation
 * Displays welcome message and bot selection options
 * 
 * Features:
 * - Welcoming interface with branding
 * - Two bot options: Ava and Eli
 * - Responsive design with logo display
 * - Interactive buttons for bot selection
 */
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
