import React, { useState } from "react";
import "./Landing.css";
import "../assets/global.css";
import { Modal } from "../components/Modal/Modal";
import RegisterModal from "../features/register";
import { RightSideBar, LandingFooter } from "../features/landing";

import whiteLogo from "../assets/Twitter-logo-white-large.png";
import LoginModal from "../features/login";

export const Landing: React.FC = () => {
  const [register, setRegister] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);

  const toggleRegister = () => {
    setRegister(!register);
  };

  const toggleLogin = () => {
    setLogin(!login);
  };
  return (
    <div className="home-container bg-color">
      {register ? (
        <RegisterModal toggleModal={toggleRegister}></RegisterModal>
      ) : (
        <></>
      )}
      {login ? <LoginModal toggleModal={toggleLogin}></LoginModal> : <></>}
      <div className="landing-layout">
        <div className="landing-top-left bg-blue">
          <img src={whiteLogo} className="landing-top-left-logo" />
        </div>
        <div className="landing-top-right">
          <RightSideBar
            toggleRegister={toggleRegister}
            toggleLogin={toggleLogin}
          />
        </div>
      </div>
      <div className="landing-bottom">
        <LandingFooter />
      </div>
    </div>
  );
};
