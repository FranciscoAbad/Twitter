import React from "react";

import "../../../../assets/global.css";
import apple from "../../../../assets/Apple-logo-large.png";
import "./Buttons.css";

export const AppleButton: React.FC = () => {
  return (
    <div className="landing-button apple">
      <img src={apple} className="landing-button-logo" />
      <p className="apple-text">Sign up with Apple</p>
    </div>
  );
};
