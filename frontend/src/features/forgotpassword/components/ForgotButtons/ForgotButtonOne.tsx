import React from "react";

import { ModalButton } from "../../../../components/ModalButton/ModalButton";
import "./ForgotButtons.css";
import "../../../../assets/global.css";

interface ForgotPasswordNextProps {
  value: string;
  handleClick: () => void;
}

export const ForgotButtonOne: React.FC<ForgotPasswordNextProps> = ({
  value,
  handleClick,
}) => {
  return (
    <div className="forgot-button">
      <ModalButton
        active={value ? true : false}
        height={50}
        fontColor={"white"}
        backgroundColor={value ? "black" : "rgba(0,0,0,0.8)"}
        fontSize={17}
        fontWeight={700}
        hoverBackground={{
          r: 0,
          g: 0,
          b: 0,
          a: 0.9,
        }}
        onClick={handleClick}
      >
        Next
      </ModalButton>
    </div>
  );
};
