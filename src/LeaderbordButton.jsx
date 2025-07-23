import React from "react";
import "./App.css";

export default function LeaderbordButton(props) {
  return (
    <div className="ld-buttons">
      <button className="ld-button" onClick={props.onClick}>
        Leaderboard
      </button>
      <span className="ld-text">
        Here you can see the leaderboard table for referrals
      </span>
    </div>
  );
}
