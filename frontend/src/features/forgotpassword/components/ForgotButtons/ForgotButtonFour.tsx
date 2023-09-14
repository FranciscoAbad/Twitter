import React from "react";

import { ModalButton } from "../../../../components/ModalButton/ModalButton";
import "./ForgotButtons.css";
import "../../../../assets/global.css";

interface ForgotPasswordFourProps {
  submitNewPassword: () => void;
  active: boolean;
}

export const ForgotButtonFour: React.FC<ForgotPasswordFourProps> = ({
  submitNewPassword,
  active,
}) => {
  return (
    <div className="forgot-button">
      <ModalButton
        active={active}
        height={50}
        fontColor={"white"}
        backgroundColor={active ? "black" : "rgba(0,0,0,0.8)"}
        fontSize={17}
        fontWeight={700}
        hoverBackground={{
          r: 0,
          g: 0,
          b: 0,
          a: 0.9,
        }}
        onClick={submitNewPassword}
      >
        Change Password
      </ModalButton>
    </div>
  );
};
