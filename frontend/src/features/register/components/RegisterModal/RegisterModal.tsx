import React, { useState } from "react";
import { Modal } from "../../../../components/Modal/Modal";
import "./RegisterModal.css";
import { RegisterStepCounter } from "../RegisterStepCounter/RegisterStepCounter";
import { determineModalContent } from "../../utils/RegisterModalUtils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { decrementStep } from "../../../../redux/Slices/RegisterSlice";
import {
  RegisterNextButton,
  StyledNextButton,
} from "../RegisterNextButton/RegisterNextButton";

export const RegisterModal: React.FC = () => {
  const state = useSelector((state: RootState) => state.register);
  const dispatcher: AppDispatch = useDispatch();

  const stepButtonClicked = () => {
    dispatcher(decrementStep());
  };

  return (
    <Modal
      topContent={
        <RegisterStepCounter step={state.step} changeStep={stepButtonClicked} />
      }
      content={determineModalContent(state.step)}
      bottomContent={<RegisterNextButton step={state.step} />}
    />
  );
};
