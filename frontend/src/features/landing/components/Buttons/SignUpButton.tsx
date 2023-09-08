import React from "react";

import "../../../../assets/global.css";
import "./Buttons.css";

interface SingUpButtonProps {
  handleClick: () => void;
}

export const SignUpButton: React.FC<SingUpButtonProps> = ({ handleClick }) => {
  return (
    <div className="landing-button sign-up" onClick={handleClick}>
      <p className="sign-up-text color-blue">Sign up with email</p>
    </div>
  );
};
