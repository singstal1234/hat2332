import React from "react";
import "./App.css";

export default function Timer(props) {
  return (
    <div className="timer">
      <div className="time-box">
        <span className="days">{props.days} Days</span>
        <span className="hours">{props.hours}</span>
      </div>
    </div>
  );
}
