/**
 * Charting Component
 * Displays medical charting information in a structured format
 * 
 * @component Charting
 * @param {Object} props Component properties
 * @param {Array} props.chartingInfo Array of charting information entries
 */

// Import dependencies
import React from "react";
import "@/styles/charting.css";

/**
 * WarningIcon Component
 * SVG icon for warning messages
 * @returns {JSX.Element} Warning icon SVG
 */
const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16.99V17M12 7V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
      stroke="#ff9800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * MessageIcon Component
 * SVG icon for regular messages
 * @returns {JSX.Element} Message icon SVG
 */
const MessageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 9H16M8 13H14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
      stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * Main Charting Component Implementation
 * Renders a container with charting information entries
 * 
 * Features:
 * - Visual distinction between warnings and regular messages
 * - Icon-based message type indication
 * - Scrollable content area
 */
function Charting({ chartingInfo }) {
  return (
    <div className="charting-container">
      <div className="charting-header">
        <h2>Charting Information</h2>
      </div>
      <div className="charting-box">
        {chartingInfo.map((info, index) => (
          <div className={`charting-info ${info.type === 'warning' ? 'warning' : 'message'}`} key={index}>
            <span className="icon">
              {info.type === 'warning' ? <WarningIcon /> : <MessageIcon />}
            </span>
            <span className="content">{info.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Charting;
