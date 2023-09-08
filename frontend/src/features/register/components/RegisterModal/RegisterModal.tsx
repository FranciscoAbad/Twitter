import React, { useState, useEffect } from "react";
import { Modal } from "../../../../components/Modal/Modal";
import "./RegisterModal.css";
import { RegisterStepCounter } from "../RegisterStepCounter/RegisterStepCounter";
import { determineModalContent } from "../../utils/RegisterModalUtils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import {
  decrementStep,
  cleanRegisterState,
} from "../../../../redux/Slices/RegisterSlice";
import { RegisterNextButton } from "../RegisterNextButton/RegisterNextButton";

interface RegisterModalProps {
  toggleModal: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  toggleModal,
}) => {
  const state = useSelector((state: RootState) => state.register);
  const dispatcher: AppDispatch = useDispatch();

  const stepButtonClicked = () => {
    if (state.step === 1) {
      toggleModal();
      return;
    }
    dispatcher(decrementStep());
  };
  useEffect(() => {
    return () => {
      dispatcher(cleanRegisterState());
    };
  }, []);

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
