import React from "react";

import { GoogleButton } from "../Buttons/GoogleButton";
import { AppleButton } from "../Buttons/AppleButton";
import { SignUpButton } from "../Buttons/SignUpButton";
import { SignInButton } from "../Buttons/SignInButton";

import "../../../../assets/global.css";
import "./RightSideBar.css";
import logoBlue from "../../../../assets/Twitter-logo-large.png";

interface RightSideBarProps {
  toggleRegister: () => void;
  toggleLogin: () => void;
}

export const RightSideBar: React.FC<RightSideBarProps> = ({
  toggleRegister,
  toggleLogin,
}) => {
  return (
    <div className="right-side-bar">
      <img src={logoBlue} className="right-side-bar-logo" />
      <h1 className="right-side-bar-h1">Happening now</h1>
      <h2 className="right-side-bar-h2">Join Twitter today.</h2>
      <div className="right-side-bar-signup-wrapper">
        <GoogleButton />
        <AppleButton />
        <div className="right-side-bar-divider">
          <div className="right-side-bar-line"></div>
          <p className="right-side-bar-or">or</p>
          <div className="right-side-bar-line"></div>
        </div>
        <SignUpButton handleClick={toggleRegister} />
        <p className="right-side-bar-legal color-gray">
          By signing up, you agree to the
          <span className="link color-blue">Terms of service</span>
          and <span className="link color-blue">Privacy Policy</span>, including{" "}
          <span className="link color-blue">Cookie Use.</span>
        </p>
      </div>
      <div className="right-side-bar-signup-wrapper">
        <h3 className="right-side-bar-h2">Already have an account?</h3>
        <SignInButton handleClick={toggleLogin} />
      </div>
    </div>
  );
};
