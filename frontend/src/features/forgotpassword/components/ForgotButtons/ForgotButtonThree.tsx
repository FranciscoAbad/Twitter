import React from "react";

import { ModalButton } from "../../../../components/ModalButton/ModalButton";
import "./ForgotButtons.css";
import "../../../../assets/global.css";

interface ForgotPasswordNextProps {
  active: boolean;
  checkCode: () => void;
  back: () => void;
}

export const ForgotButtonThree: React.FC<ForgotPasswordNextProps> = ({
  active,
  checkCode,
  back,
}) => {
  return (
    <div className="forgot-button">
      {active ? (
        <ModalButton
          active={true}
          height={50}
          fontColor={"white"}
          backgroundColor={"black"}
          fontSize={17}
          fontWeight={700}
          hoverBackground={{
            r: 0,
            g: 0,
            b: 0,
            a: 0.9,
          }}
          onClick={checkCode}
        >
          Next
        </ModalButton>
      ) : (
        <ModalButton
          active={true}
          height={50}
          fontColor={"black"}
          borderColor={"#AAB8C2"}
          backgroundColor={"white"}
          fontSize={17}
          fontWeight={600}
          hoverBackground={{
            r: 0,
            g: 0,
            b: 0,
            a: 0.05,
          }}
          hoverBorder={{
            r: 0,
            g: 0,
            b: 0,
            a: 0.3,
          }}
          onClick={back}
        >
          Back
        </ModalButton>
      )}
    </div>
  );
};
