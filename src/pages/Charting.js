import React from "react";
import "@/styles/charting.css";

function Charting({ chartingInfo }) {
  return (
    <div className="charting-container">
      <div className="charting-header">
        <h2>Charting Information</h2>
      </div>
      <div className="charting-box">
        {chartingInfo.map((info, index) => {
          return (
            <div className="charting-info" key={index}>
              {info.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Charting;
