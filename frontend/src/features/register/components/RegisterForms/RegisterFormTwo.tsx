import React from "react";

import "../RegisterForms/RegisterForm.css";
import "../../../../assets/global.css";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";

export const RegisterFormTwo: React.FC = () => {
  return (
    <div className="register-container">
      <div className="register-content">
        <h1 className="register-header">Customize your experience</h1>
        <h3 className="register-subheader">
          Track where you see Twitter content across the web.
        </h3>
        <div className="register-two-checkbox-wrapper">
          <p className="register-text">
            Twitter use this data to personalize yout experience. This web
            browsing history will never be stored whit you name,email or phone
            number.
          </p>
          <Checkbox />
        </div>
        <p className="register-text color-gray">
          By signing up, you agree to our{" "}
          <span className="register-link color-blue"></span>,
          <span className="register-link color-blue">Privacy Policy</span>
          and <span className="register-link color-blue">Cookie use</span>.
          Twitter may use your contact information, including your email adress
          and phone number for the purpouse outline in our Privacy Polcy.<> </>
          <span className="register-link color-blue">Learn more</span>.
        </p>
      </div>
    </div>
  );
};
