import React from "react";
import "./buttons.css";

export const GoldButton = ({ text, setStep, step }) => {
  return (
    <button className="goldButton" onClick={() => setStep(step + 1)}>
      {text}
    </button>
  );
};
