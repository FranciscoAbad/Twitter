import React from "react";

import "./LoginModalTop.css";
import blueLogo from "../../../../assets/Twitter-logo-large.png";

interface LoginModalTopProps {
  closeModal: () => void;
}

export const LoginModalTop: React.FC<LoginModalTopProps> = ({ closeModal }) => {
  return (
    <div className="login-modal-top">
      <div className="login-modal-top-left">
        <div className="login-modal-top-shadow" onClick={closeModal}>
          x
        </div>
      </div>
      <div className="login-modal-top-middle">
        <img src={blueLogo} className="login-modal-top-logo" />
      </div>
      <div className="login-modal-top-right"></div>
    </div>
  );
};
