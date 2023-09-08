import React from "react";

import google from "../../../../assets/Google-logo-large.png";
import "../../../../assets/global.css";
import "./Buttons.css";

export const GoogleButton: React.FC = () => {
  return (
    <div className="landing-button google color-gray">
      <img src={google} className="landing-button-logo" />
      <p className="google-text">Sign up with Google</p>
    </div>
  );
};
