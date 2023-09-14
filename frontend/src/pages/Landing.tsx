import React, { useState } from "react";
import "./Landing.css";
import "../assets/global.css";
import { Modal } from "../components/Modal/Modal";
import RegisterModal from "../features/register";
import { RightSideBar, LandingFooter } from "../features/landing";

import whiteLogo from "../assets/Twitter-logo-white-large.png";
import LoginModal from "../features/login";
import { AppDispatch } from "../redux/Store";
import { useDispatch } from "react-redux";
import { resetUsername } from "../redux/Slices/UserSlice";
import ForgotPasswordModal from "../features/forgotpassword/components";

export const Landing: React.FC = () => {
  const [register, setRegister] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const toggleRegister = () => {
    setRegister(!register);
  };

  const toggleLogin = () => {
    setLogin(!login);
    dispatch(resetUsername);
  };

  const toggleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
  };
  return (
    <div className="home-container bg-color">
      {register ? (
        <RegisterModal toggleModal={toggleRegister}></RegisterModal>
      ) : (
        <></>
      )}
      {login ? (
        <LoginModal
          toggleForgotPassword={toggleForgotPassword}
          toggleRegister={toggleRegister}
          toggleModal={toggleLogin}
        ></LoginModal>
      ) : (
        <></>
      )}
      {forgotPassword ? (
        <ForgotPasswordModal toggleModal={toggleForgotPassword} />
      ) : (
        <></>
      )}

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
